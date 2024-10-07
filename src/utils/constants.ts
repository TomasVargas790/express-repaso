export enum STATUS {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    PENDING = 'PENDING'
}

export enum MESSAGES {
    BAD_REQUEST = 'Bad Request :/',
    BAD_TOKEN = 'Invalid token',
    NO_TOKEN = 'No token detected',
    SUCCESS = 'Success',
    DUPLICATE = 'Duplicate',
    NOT_FOUND = 'Not found',
    INTERNAL_ERROR = 'Internal error'
}

export enum STATUS_CODES {
    INTERNAL_ERROR = 500,
    NOT_FOUND = 404,
    BAD_AUTHORIZATION = 402,
    BAD_AUTHENTICATION = 401,
    BAD_REQUEST = 400,
    SUCCESS = 200,
    SUCCESS_CREATION = 201
}

export enum TYPEORM_ERROR_CODES {
    ER_DUP_ENTRY = 'ER_DUP_ENTRY'
}