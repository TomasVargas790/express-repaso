import { InsertResult } from "typeorm"

export const getIdsFromTypeOrm = (result: InsertResult) => {
    return result.identifiers.flatMap((identifier) => identifier.id as string)
}