import jwt from 'jsonwebtoken'
import env from './env'
import { RequestHandler, Response } from 'express'
import { response, errorResponse } from './utils/network'
import { MESSAGES, STATUS, STATUS_CODES } from './utils/constants'
import { connection } from './db'

const { server: { secret } } = env

const DEFAULT_EXPIRE_TIME = '10m'

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
        console.error('JWT verification failed:', err.message);
        return null;
    }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const { headers: { authorization } } = req
        if (!authorization) return noTokenResponse(res)
        const token = authorization.split('Bearer ')[1]
        if (!token) return noTokenResponse(res)
        const payload = verifyToken(token)
        if (!payload) return badTokenResponse(res)
        next();
    } catch (error) {
        console.error('[AUTH ERROR]', error);
        return errorResponse(res)
    }
};

export const loginMiddleware: RequestHandler = async (req, res) => {
    try {
        const { headers: { authorization } } = req
        if (!authorization) return noTokenResponse(res)
        const basicToken = authorization.split('Basic ')[1]
        if (!basicToken) return noTokenResponse(res)
        if (!await verifyCredentials(basicToken)) return badTokenResponse(res)


    } catch (error) {
        console.error('[AUTH ERROR]', error);
        return errorResponse(res)
    }
};

async function verifyCredentials(token: string) {
    return queryCredentials(token)
}

function noTokenResponse(res: Response) {
    return response({
        res,
        status: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_AUTHENTICATION,
        message: MESSAGES.NO_TOKEN
    })
}

function badTokenResponse(res: Response) {
    return response({
        res,
        status: STATUS.ERROR,
        statusCode: STATUS_CODES.BAD_AUTHENTICATION,
        message: MESSAGES.BAD_TOKEN
    })
}

async function queryCredentials(token: string) {
    const [username, password] = atob(token).split(':')
    const [, result] = await connection.query(`SELECT Id FROM User WHERE username = ${username} AND password = ${password}`)

    return result.length > 0
}