import { RequestHandler, Response } from 'express'
import { MESSAGES, STATUS, STATUS_CODES } from './constants.js'


export type ResponseWrapper = {
    res: Response,
    status: STATUS,
    statusCode: STATUS_CODES,
    message: MESSAGES,
    payload?: object
}

export function errorResponse(res: Response) {
    return response({
        status: STATUS.ERROR,
        message: MESSAGES.BAD_REQUEST,
        statusCode: STATUS_CODES.BAD_REQUEST,
        res
    })
}

export function successResponse(res: Response) {
    return response({
        status: STATUS.SUCCESS,
        message: MESSAGES.SUCCESS,
        statusCode: STATUS_CODES.SUCCESS,
        res
    })
}

export function response({ res, ...response }: ResponseWrapper) {
    return res.status(response.statusCode).json(response)
}


export const headerHandler: RequestHandler = (_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
}
