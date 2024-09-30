export enum STATUS {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    PENDING = 'PENDING'
}

export enum MESSAGES {
    BAD_REQUEST = 'Bad Request :/',
    BAD_TOKEN = 'Invalid Token',
    NO_TOKEN = 'No token detected',
    SUCCESS = 'Success',
    DUPLICATE = 'Duplicate',
    NOT_FOUND = 'Not found',
}

export enum STATUS_CODES {
    BAD_REQUEST = 400,
    BAD_AUTHENTICATION = 401,
    BAD_AUTHORIZATION = 402,
    NOT_FOUND = 404,
    SUCCESS = 200,
    SUCCESS_CREATION = 201
}