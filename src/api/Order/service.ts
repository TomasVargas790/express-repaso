import { type RequestHandler } from 'express'
import { AppDataSource } from '@db/connection/data-source'
import { Order } from '@db/entity/Order'
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from '@utils/network'
import { getIdsFromTypeOrm } from '@utils/dml'
import { TYPEORM_ERROR_CODES } from '@utils/constants'
import { duplicateErrorResponse } from '@auth/utils'

const orderRepository = AppDataSource.getRepository(Order)

export const getOrder: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);


        if (!id) {
            return successResponse(res, await orderRepository.find())
        }

        const result = await orderRepository.findOne({ where: { id }, relations: { products: true } });
        if (!result) {
            return errorNotFoundResponse(res)
        }


        return successResponse(res, result)
    } catch (error) {
        console.error(error);
        errorResponse(res)
    }
}
export const insertOrder: RequestHandler = async (req, res) => {
    try {
        const input = <Order[]>req.body?.orders ?? <Order>req.body;
        const id = getIdsFromTypeOrm(await orderRepository.insert(input));
        return successInsertResponse(res, { id })
    } catch (error) {
        console.error(error);
        if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
            return duplicateErrorResponse(res)
        }
        return errorResponse(res)
    }


}
export const updateOrder: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const input = <Order>req.body
        const result = await orderRepository.update(id, input);
        return successInsertResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }
}
export const deleteOrder: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await orderRepository.delete(id);
        return successResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }

}