import { RequestHandler, Response, json, Express } from 'express'
import { MESSAGES, STATUS, STATUS_CODES } from './constants'


export type ResponseWrapper = {
    res: Response,
    state: STATUS,
    statusCode: STATUS_CODES,
    message: MESSAGES,
    payload?: object
}

export function errorResponse(res: Response, payload?: object) {
    return buildResponse({
        state: STATUS.ERROR,
        message: MESSAGES.INTERNAL_ERROR,
        statusCode: STATUS_CODES.INTERNAL_ERROR,
        payload,
        res
    })
}
export function errorNotFoundResponse(res: Response, payload?: object) {
    return buildResponse({
        state: STATUS.ERROR,
        message: MESSAGES.NOT_FOUND,
        statusCode: STATUS_CODES.NOT_FOUND,
        payload,
        res
    })
}

export function successResponse(res: Response, payload?: object) {
    return buildResponse({
        state: STATUS.SUCCESS,
        message: MESSAGES.SUCCESS,
        statusCode: STATUS_CODES.SUCCESS,
        payload,
        res
    })
}

export function successInsertResponse(res: Response, payload?: object) {
    return buildResponse({
        state: STATUS.SUCCESS,
        message: MESSAGES.SUCCESS,
        statusCode: STATUS_CODES.SUCCESS_CREATION,
        payload,
        res
    })
}

export function buildResponse({ res, payload, ...response }: ResponseWrapper) {
    return res.status(response.statusCode).json({ ...response, payload })
}

export const initialMiddlewares = (app: Express) => {
    app.use(headerHandler)
    app.use(json())
}

export const headerHandler: RequestHandler = (_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Expose-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
}
