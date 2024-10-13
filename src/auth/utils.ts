import { MESSAGES, STATUS, STATUS_CODES } from '../utils/constants'
import { buildResponse } from '../utils/network'
import { type Response } from 'express'
import env from '../env'
import jwt from 'jsonwebtoken'

const { server: { secret } } = env

const DEFAULT_EXPIRE_TIME = '10m'

export function noTokenResponse(res: Response) {
    return buildResponse({
        res,
        state: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_AUTHENTICATION,
        message: MESSAGES.NO_TOKEN
    })
}

export function badTokenResponse(res: Response) {
    return buildResponse({
        res,
        state: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_AUTHENTICATION,
        message: MESSAGES.BAD_TOKEN
    })
}

export function duplicateErrorResponse(res: Response) {
    return buildResponse({
        res,
        state: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.DUPLICATE
    })
}

export function signToken(
    payload: string | object | Buffer,
    expiresIn: string = DEFAULT_EXPIRE_TIME
): string {
    return jwt.sign(payload, secret, { expiresIn, })
}

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        logger.error('JWT verification failed:', err.message);
        return null;
    }
}
