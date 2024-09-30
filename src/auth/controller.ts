import env from "../env.js"
import jwt from 'jsonwebtoken'

const { server: { secret } } = env

const DEFAULT_EXPIRE_TIME = '10m'

/* export async function verifyCredentials(token: string) {
    return queryCredentials(token)
} */


/* export async function queryCredentials(token: string) {
    const [username, password] = atob(token).split(':')
    const [, result] = await connection.query(`SELECT Id FROM User WHERE username = ${username} AND password = ${password}`)

    return result.length > 0
} */
export function signToken(
    payload: string | object | Buffer,
    expiresIn: string = DEFAULT_EXPIRE_TIME
): string {
    return jwt.sign(payload, secret, { expiresIn, })
}

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        logger.error('JWT verification failed:', err.message);
        return null;
    }
}
