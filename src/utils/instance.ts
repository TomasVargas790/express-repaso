import { FindOptionsWhere, Repository, } from 'typeorm';
import { getIdsFromTypeOrm } from './dml';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Request, Response } from 'express';
import { errorNotFoundResponse, errorResponse, successInsertResponse, successResponse } from './network';
import { duplicateErrorResponse } from '@/auth/utils';
import { TYPEORM_ERROR_CODES } from './constants';


export abstract class Instance<T> {

    model: Repository<T>;

    constructor(model: Repository<T>) {
        this.model = model;
    }

    async get(req: Request, res: Response): Promise<unknown> {
        try {
            const id = Number(req.params.id);
            if (!id) {
                return successResponse(res, await this.model.find())
            }

            const result = await this.model.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
            if (!result) {
                return errorNotFoundResponse(res)
            }
            return successResponse(res, result)
        } catch (error) {
            console.error(error);
            errorResponse(res)
        }
    }

    async count(req: Request, res: Response): Promise<unknown> {
        try {
            const result = await this.model.count({ where });
            return successResponse(res, result)
        } catch (error) {
            console.error(error);
            errorResponse(res)
        }
        return await this.model.count({ where });
    }

    async getWithPagination(page: number, pageSize: number, where?: FindOptionsWhere<T>): Promise<{ rows: T[], count: number }> {
        const take = pageSize;
        const skip = (page - 1) * pageSize;

        const rows = await this.model.find({ where, take, skip }) as T[];
        const count = await this.model.count({ where });

        return { rows, count };
    }

    async insert(req: Request, res: Response): Promise<unknown> {
        try {
            const input = <QueryDeepPartialEntity<T>[]>req.body[this.model.metadata.name] ?? <QueryDeepPartialEntity<T>>req.body;
            const id = getIdsFromTypeOrm(await this.model.insert(input));
            return successInsertResponse(res, { id })
        } catch (error) {
            console.error(error);
            if (error.code === TYPEORM_ERROR_CODES.ER_DUP_ENTRY) {
                return duplicateErrorResponse(res)
            }
            return errorResponse(res)
        }

    }

    async update(req: Request, res: Response): Promise<unknown> {
        try {
            const id = Number(req.params.id);
            const input = <QueryDeepPartialEntity<T>>req.body
            const result = await this.model.update(id, input);
            return successInsertResponse(res, { rowsAffected: result?.affected })
        } catch (error) {
            console.error(error);
            return errorResponse(res)
        }
    }

    async delete(req: Request, res: Response): Promise<unknown> {
        try {
            const id = Number(req.params.id);
            const { soft } = req.query;
            if (soft) return (await this.model.softDelete(id)).affected;
            const result = await this.model.delete(id);
            return successResponse(res, { rowsAffected: result?.affected })
        } catch (error) {
            console.error(error);
            return errorResponse(res)
        }
    }

    async restore(req: Request, res: Response): Promise<unknown> {

        try {
            const id = Number(req.params.id);
            await this.model.restore(id);
            const [result, affected] = await this.model.findAndCountBy({ id } as unknown as FindOptionsWhere<T>);
            return successResponse(res, { result, affected })
        } catch (error) {
            console.error(error);
            return errorResponse(res)
        }

    }
}