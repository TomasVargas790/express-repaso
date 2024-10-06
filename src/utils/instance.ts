// import { FindOptions, FindOptionsWhere, Repository } from "typeorm";

// export abstract class Instance<T extends Repository<T>> {

//     model: Repository<T>;

//     constructor(model: Repository<T>) {
//         this.model = model;
//     }

//     async getAll(): Promise<T[]> {
//         return await this.model.find() as T[];
//     }

//     async getById(id: string)/* : Promise<T | (undefined | null)> */ {
//         return await this.model.findBy([{ id }] as FindOptionsWhere<T>) /* as T | (undefined | null) */;
//     }

//     async getByFields(where: any): Promise<T[] | (undefined | null)> {
//         return await this.model.findAll(where) as T[] | (undefined | null);
//     }

//     async count(where?: any): Promise<number> {
//         return await this.model.count({ where });
//     }

//     async getWithPagination(page: number, pageSize: number, where?: any): Promise<{ rows: T[], count: number }> {
//         const limit = pageSize;
//         const offset = (page - 1) * pageSize;

//         const rows = await this.model.findAll({ where, limit, offset }) as T[];
//         const count = await this.model.count({ where });

//         return { rows, count };
//     }

//     async insert(data: T): Promise<T> {
//         return await this.model.create(data) as T;
//     }

//     async bulkInsert(data: T[]): Promise<T[]> {
//         return await this.model.bulkCreate(data, { validate: true }) as T[];
//     }

//     async update(id: string, data: Partial<T>): Promise<T> {
//         const row = await this.getById(id)
//         if (!row) throw Error('No se a encontrado ese registro')
//         return await row.update(data)
//     }

//     async bulkUupdate(data: Partial<T>, where: any): Promise<[number, T[]]> {
//         return await this.model.update<T>(data, { where, returning: true });
//     }

//     async delete(where: any): Promise<number> {
//         return await this.model.destroy({ where });
//     }

//     async restore(where: any): Promise<[number, T[]]> {
//         await this.model.restore({ where });
//         const { count, rows } = await this.model.findAndCountAll<T>({ where });

//         return [count, rows];
//     }
// }