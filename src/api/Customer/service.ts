import { type RequestHandler } from 'express'
import { AppDataSource } from '@db/connection/data-source'
import { Customer } from '@db/entity/Customer'
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from '@utils/network'
import { getIdsFromTypeOrm } from '@utils/dml'
import { TYPEORM_ERROR_CODES } from '@utils/constants'
import { duplicateErrorResponse } from '@auth/utils'

const customerRepository = AppDataSource.getRepository(Customer)

export const getCustomer: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);


        if (!id) {
            return successResponse(res, await customerRepository.find())
        }

        const result = await customerRepository.findOne({ where: { id } });
        if (!result) {
            return errorNotFoundResponse(res)
        }


        return successResponse(res, result)
    } catch (error) {
        console.error(error);
        errorResponse(res)
    }
}
export const insertCustomer: RequestHandler = async (req, res) => {
    try {
        const input = <Customer[]>req.body?.customers ?? <Customer>req.body;
        const id = getIdsFromTypeOrm(await customerRepository.insert(input));
        return successInsertResponse(res, { id })
    } catch (error) {
        console.error(error);
        if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
            return duplicateErrorResponse(res)
        }
        return errorResponse(res)
    }


}
export const updateCustomer: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const input = <Customer>req.body
        const result = await customerRepository.update(id, input);
        return successInsertResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }
}
export const deleteCustomer: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await customerRepository.delete(id);
        return successResponse(res, { rowsAffected: result?.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }

}