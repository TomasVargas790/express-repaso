import { type RequestHandler } from 'express'
import { AppDataSource } from '@db/connection/data-source'
import { Brand } from '@db/entity/Brand'
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from '@utils/network'
import { getIdsFromTypeOrm } from '@utils/dml'
import { TYPEORM_ERROR_CODES } from '@utils/constants'
import { duplicateErrorResponse } from '@auth/utils'

const brandRepository = AppDataSource.getRepository(Brand)

export const getBrand: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);


        if (!id) {
            return successResponse(res, await brandRepository.find())
        }

        const result = await brandRepository.findOne({ where: { id } });
        if (!result) {
            return errorNotFoundResponse(res)
        }


        return successResponse(res, result)
    } catch (error) {
        console.error(error);
        errorResponse(res)
    }
}
export const insertBrand: RequestHandler = async (req, res) => {
    try {
        const input = <Brand[]>req.body?.brands ?? <Brand>req.body;
        const id = getIdsFromTypeOrm(await brandRepository.insert(input));
        return successInsertResponse(res, { id })
    } catch (error) {
        console.error(error);
        if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
            return duplicateErrorResponse(res)
        }
        return errorResponse(res)
    }


}
export const updateBrand: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { code, name } = req.body
        const result = await brandRepository.update(id, { code, name });
        return successInsertResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }
}
export const deleteBrand: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await brandRepository.delete(id);
        return successResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }

}