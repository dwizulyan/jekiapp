// middlewares/auth.ts
import type { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

const secret = process.env.TOKEN; // sebaiknya dari ENV

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = getCookie(c, "token");

    if (!token) {
        return c.json({ message: 'Unauthorized - No token' }, 401);
    }

    try {
        const payload = await verify(token, secret as string);
        // Simpan payload di context
        c.set('user', payload);
        await next();
    } catch (err) {
        return c.json({ message: 'Unauthorized - Invalid token' }, 401);
    }
};
