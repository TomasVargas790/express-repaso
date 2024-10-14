import { Repository, ObjectLiteral } from "typeorm";
import { successResponse, errorNotFoundResponse, errorResponse, successInsertResponse } from "./network";
import { Request, Response, Router } from "express";
import { Instance } from "./instance_bk";
import { duplicateErrorResponse } from "@/auth/utils";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { TYPEORM_ERROR_CODES } from "./constants";

export class CRUD<T extends ObjectLiteral> {

    controller: Instance<T>
    model: Repository<T>

    constructor(model: Repository<T>) {

        this.controller = new Instance(model)
        this.model = model
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.patch = this.patch.bind(this);
        this.delete = this.delete.bind(this);
    }

    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return successResponse(res, await this.controller.getAll())
            }

            const result = await this.controller.getById(id);
            if (!result) {
                return errorNotFoundResponse(res)
            }
            return successResponse(res, result)
        } catch (error) {
            console.error(error);
            errorResponse(res)
        }
    }

    async post(req: Request, res: Response) {
        try {
            const input = <QueryDeepPartialEntity<T>[]>req.body[this.controller.model.metadata.name] ?? <QueryDeepPartialEntity<T>>req.body;
            const id = await this.controller.insert(input);
            return successInsertResponse(res, { id })
        } catch (error) {
            console.error(error);
            if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
                return duplicateErrorResponse(res)
            }
            return errorResponse(res)
        }

    }

    async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const input = <QueryDeepPartialEntity<T>>req.body
            const result = await this.controller.model.update(id, input);
            return successInsertResponse(res, { rowsAffected: result?.affected })
        } catch (error) {
            console.error(error);
            return errorResponse(res)
        }
    }

    async delete(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params;
            const { soft } = req.query;
            const result = await this.controller.delete(id as string, !!soft);
            return successResponse(res, { affected: result })
        } catch (error) {
            console.error(error);
            return errorResponse(res)
        }
    }
}

export function useRouter<T extends ObjectLiteral>(router: Router, model: CRUD<T>) {

    router.get('/:id?', model.get);
    router.post('/', model.post);
    router.patch('/:id', model.patch);
    router.delete('/:id', model.delete);

    return router
}