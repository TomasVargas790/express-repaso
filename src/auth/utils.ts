import { MESSAGES, STATUS, STATUS_CODES } from "../utils/constants.js"
import { buildResponse } from "../utils/network.js"
import { Response } from 'express'

export function noTokenResponse(res: Response) {
    return buildResponse({
        res,
        status: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_AUTHENTICATION,
        message: MESSAGES.NO_TOKEN
    })
}

export function badTokenResponse(res: Response) {
    return buildResponse({
        res,
        status: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_AUTHENTICATION,
        message: MESSAGES.BAD_TOKEN
    })
}

export function duplicateErrorResponse(res: Response) {
    return buildResponse({
        res,
        status: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.DUPLICATE
    })
}