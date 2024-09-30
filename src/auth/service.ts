
import 'reflect-metadata'
import type { RequestHandler } from 'express';
import { errorNotFoundResponse, errorResponse, successResponse } from '../utils/network.js'
import { badTokenResponse, duplicateErrorResponse, noTokenResponse } from './utils.js';
import { signToken, verifyToken } from './controller.js';
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
        const user = await userRepository.findOne({ where: { email, password } })
        console.log(user);

        if (!user) return errorNotFoundResponse(res)

        const token = signToken(JSON.parse(JSON.stringify(user)))
        successResponse(res, { token })

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
        const result = await userRepository.insert({
            firstName,
            lastName,
            email,
            phone,
            password
        })

        const ids = result.identifiers.flatMap((identifier) => identifier.id)
        return successResponse(res, { ids })
    } catch (error) {
        logger.error(error);
        if (error.code) {
            return duplicateErrorResponse(res)
        } else {
            return errorResponse(res)
        }
    }

}