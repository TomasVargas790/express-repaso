import { type RequestHandler } from 'express'
import { AppDataSource } from '@db/connection/data-source'
import { Product } from '@db/entity/Product'
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from '@utils/network'
import { getIdsFromTypeOrm } from '@utils/dml'
import { TYPEORM_ERROR_CODES } from '@utils/constants'
import { duplicateErrorResponse } from '@auth/utils'

const productRepository = AppDataSource.getRepository(Product)

export const getProduct: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);


        if (!id) {
            return successResponse(res, await productRepository.find())
        }

        const result = await productRepository.findOne({ where: { id } });
        if (!result) {
            return errorNotFoundResponse(res)
        }


        return successResponse(res, result)
    } catch (error) {
        console.error(error);
        errorResponse(res)
    }
}
export const insertProduct: RequestHandler = async (req, res) => {
    try {
        const input = <Product[]>req.body?.products ?? <Product>req.body;
        const id = getIdsFromTypeOrm(await productRepository.insert(input));
        return successInsertResponse(res, { id })
    } catch (error) {
        console.error(error);
        if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
            return duplicateErrorResponse(res)
        }
        return errorResponse(res)
    }


}
export const updateProduct: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { code, name } = req.body
        const result = await productRepository.update(id, { code, name });
        return successInsertResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }
}
export const deleteProduct: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await productRepository.delete(id);
        return successResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }

}