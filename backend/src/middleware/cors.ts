import type { MiddlewareHandler } from 'hono'

const allowedOriginPrefixes = [
    'http://localhost',
    'http://127.0.0.1',
    'http://192.168.',
    'http://10.',
    'http://101.101.'
]

export const customCORS = (): MiddlewareHandler => {
    return async (c, next) => {
        const origin = c.req.header('Origin') || ''

        const isAllowed = allowedOriginPrefixes.some((prefix) => origin.startsWith(prefix))

        if (isAllowed) {
            c.header('Access-Control-Allow-Origin', origin)
        }

        c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        c.header('Access-Control-Allow-Credentials', 'true')

        // Handle preflight request (OPTIONS)
        if (c.req.method === 'OPTIONS') {
            return c.body(null, 204)
        }

        await next()
    }
}