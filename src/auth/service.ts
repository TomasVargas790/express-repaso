
import type { RequestHandler } from 'express';
import { errorResponse } from '../utils/network.js'
import { badTokenResponse, noTokenResponse } from './utils.js';
import { /* verifyCredentials, */ verifyToken } from './controller.js';

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
        /* if (!await verifyCredentials(basicToken)) return badTokenResponse(res) */


    } catch (error) {
        console.error('[AUTH ERROR]', error);
        return errorResponse(res)
    }
};


export const registerMiddleware: RequestHandler = async (req, res) => {
    const { username, password } = req.body
    
}