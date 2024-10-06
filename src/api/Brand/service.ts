import { type RequestHandler } from "express"
import { AppDataSource } from "@db/connection/data-source.js"
import { Brand } from "@db/entity/Brand.js"
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from "@utils/network.js"
import { getIdsFromTypeOrm } from "@utils/dml.js"

const brandRepository = AppDataSource.getRepository(Brand)

export const getBrand: RequestHandler = async (req, res) => {
    const id = Number(req.query.id);


    if (!id) {
        return successResponse(res, await brandRepository.find())
    }

    const result = await brandRepository.findOne({ where: { id } });
    if (!result) {
        return errorNotFoundResponse(res)
    }


    return successResponse(res, result)

}
export const insertBrand: RequestHandler = async (req, res) => {
    try {

        const { code, name } = req.body
        const result = getIdsFromTypeOrm(await brandRepository.insert({ code, name }));
        return successInsertResponse(res, { id: result })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }


}
export const updateBrand: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.query.id);
        const { code, name } = req.body
        const result = await brandRepository.update(id, { code, name });
        return successInsertResponse(res, { id: result.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }
}
export const deleteBrand: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.query.id);
        const result = await brandRepository.delete(id);
        return successResponse(res, { id: result.affected })
    } catch (error) {
        console.error(error);
        return errorResponse(res)
    }

}