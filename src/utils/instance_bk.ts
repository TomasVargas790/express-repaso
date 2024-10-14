import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository, } from 'typeorm';
import { getIdsFromTypeOrm } from './dml';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class Instance<T extends ObjectLiteral> {

    model: Repository<T>;

    constructor(model: Repository<T>) {
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        return await this.model.find();
    }

    async getById(id: string) {
        return await this.model.findOneBy({ id } as unknown as FindOptionsWhere<T>)
    }

    async getByFields(where: FindManyOptions<T>): Promise<T[] | (undefined)> {
        return await this.model.find(where);
    }

    async count(where?: FindOptionsWhere<T>): Promise<number> {
        return await this.model.count({ where });
    }

    async getWithPagination(page: number, pageSize: number, where?: FindOptionsWhere<T>): Promise<{ rows: T[], count: number }> {
        const take = pageSize;
        const skip = (page - 1) * pageSize;

        const rows = await this.model.find({ where, take, skip }) as T[];
        const count = await this.model.count({ where });

        return { rows, count };
    }

    async insert(data: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]): Promise<string[]> {
        const result = await this.model.insert(data)
        return getIdsFromTypeOrm(result);
    }

    async update(where: string | FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<number | undefined> {
        return (await this.model.update(where, data)).affected;
    }

    async delete(where: string | FindOptionsWhere<T>, soft: boolean): Promise<number | null | undefined> {
        if (soft) return (await this.model.softDelete(where)).affected;
        return (await this.model.delete(where)).affected;
    }

    async restore(where: FindOptionsWhere<T>): Promise<[T[], number]> {
        await this.model.restore(where);
        return await this.model.findAndCountBy(where);
    }
}