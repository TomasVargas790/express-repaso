
import 'reflect-metadata'
import type { RequestHandler } from 'express';
import { errorResponse, successResponse } from '../utils/network.js'
import { badTokenResponse, duplicateErrorResponse, noTokenResponse } from './utils.js';
import { verifyToken } from './controller.js';
import { AppDataSource } from '../db/connection/data-source.js'
import { User } from '../db/entity/User.js';


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
        logger.error('[AUTH ERROR]', error);
        return errorResponse(res)
    }
};

export const loginMiddleware: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body
        const userRepository = AppDataSource.getRepository(User)

        res.json(await userRepository.find())
        //if (!username || !password) return errorResponse(res)
        /* if (!await verifyCredentials(basicToken)) return badTokenResponse(res) */


    } catch (error) {
        logger.error('[AUTH ERROR]', error);
        return errorResponse(res)
    }
};

export const registerMiddleware: RequestHandler = async (req, res) => {

    const userRepository = AppDataSource.getRepository(User)

    const { firstName,
        lastName,
        email,
        phone,
        password } = req.body

    try {
        const result = await AppDataSource.manager.save({
            firstName,
            lastName,
            email,
            phone,
            password
        })
        
        return successResponse(res)
    } catch (error) {
        logger.error(error);
        if (error.code) {
            return duplicateErrorResponse(res)
        } else {
            return errorResponse(res)
        }
    }

}