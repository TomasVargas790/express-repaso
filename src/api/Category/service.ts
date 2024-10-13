import { type RequestHandler } from 'express'
import { AppDataSource } from '@db/connection/data-source'
import { Category } from '@db/entity/Category'
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from '@utils/network'
import { getIdsFromTypeOrm } from '@utils/dml'
import { TYPEORM_ERROR_CODES } from '@utils/constants'
import { duplicateErrorResponse } from '@auth/utils'

const categoryRepository = AppDataSource.getRepository(Category)

export const getCategory: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);


        if (!id) {
            return successResponse(res, await categoryRepository.find())
        }

        const result = await categoryRepository.findOne({ where: { id } });
        if (!result) {
            return errorNotFoundResponse(res)
        }


        return successResponse(res, result)
    } catch (error) {
        console.error(error);
        errorResponse(res)
    }
}
export const insertCategory: RequestHandler = async (req, res) => {
    try {
        const input = <Category[]>req.body?.categorys ?? <Category>req.body;
        const id = getIdsFromTypeOrm(await categoryRepository.insert(input));
        return successInsertResponse(res, { id })
    } catch (error) {
        console.error(error);
        if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
            return duplicateErrorResponse(res)
        }
        return errorResponse(res)
    }


}
export const updateCategory: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const input = <Category>req.body
        const result = await categoryRepository.update(id, input);
        return successInsertResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }
}
export const deleteCategory: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await categoryRepository.delete(id);
        return successResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }

}