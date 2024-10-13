import { type RequestHandler } from 'express'
import { AppDataSource } from '@db/connection/data-source'
import { ProductVersion } from '@db/entity/ProductVersion'
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from '@utils/network'
import { getIdsFromTypeOrm } from '@utils/dml'
import { TYPEORM_ERROR_CODES } from '@utils/constants'
import { duplicateErrorResponse } from '@auth/utils'

const productVersionRepository = AppDataSource.getRepository(ProductVersion)

export const getProductVersion: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);


        if (!id) {
            return successResponse(res, await productVersionRepository.find())
        }

        const result = await productVersionRepository.findOne({ where: { id } });
        if (!result) {
            return errorNotFoundResponse(res)
        }


        return successResponse(res, result)
    } catch (error) {
        console.error(error);
        errorResponse(res)
    }
}
export const insertProductVersion: RequestHandler = async (req, res) => {
    try {
        const input = <ProductVersion[]>req.body?.productVersions ?? <ProductVersion>req.body;
        const id = getIdsFromTypeOrm(await productVersionRepository.insert(input));
        return successInsertResponse(res, { id })
    } catch (error) {
        console.error(error);
        if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
            return duplicateErrorResponse(res)
        }
        return errorResponse(res)
    }


}
export const updateProductVersion: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const input = <ProductVersion>req.body
        const result = await productVersionRepository.update(id, input);
        return successInsertResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }
}
export const deleteProductVersion: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await productVersionRepository.delete(id);
        return successResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }

}