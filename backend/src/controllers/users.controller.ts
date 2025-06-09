import { Hono } from "hono";
import type { Context } from "hono";
import { dbUsers } from "@/services/users.service.js";
import type { IUsers } from "@/types/users.type.js";
import { sign } from "hono/jwt";
import { setCookie, deleteCookie } from "hono/cookie";
import { ValidationError } from "@/errors/ValidationError.js";
import { Prisma } from "@prisma/client";

const userController = new Hono();
userController.get("/:id", async (c: Context) => {
    try {
        const { id } = c.req.param()
        if (!id) {
            throw new ValidationError("No id provided");
        }
        const profile = await dbUsers.getById(Number(id));
        return c.json({
            success: true,
            message: `Success fetching data ${id}`,
            data: { profile: { id: id, username: profile.username, email: profile.email } }
        })
    } catch (err) {
        return c.json({
            success: false,
            message: err instanceof ValidationError ? err.message : "Unknown Error"
        })
    }
})

userController.get("/get-all", async (c: Context) => {
    try {
        const getAll: IUsers[] = await dbUsers.getAll();
        return c.json({
            succes: true,
            message: "These are the users that exists in database",
            data: getAll,
        })
    } catch (err) {
        return c.json({
            success: false,
            message: err instanceof Error ? err.message : "Unkown Error",
        })
    }
})
userController.post("/create", async (c: Context) => {
    try {
        const { email, username, password } = await c.req.json();
        const create: IUsers = await dbUsers.create(email, username, password);
        return c.json({
            success: true,
            message: "Success creating new account",
        })
    }
    catch (err) {
        return c.json({
            success: false,
            message: err instanceof Error ? err.message : "Unkown Error",
        })
    }
})

userController.post("/login", async (c: Context) => {
    try {
        const secret = process.env.TOKEN;
        const { username, password } = await c.req.json();
        const login = await dbUsers.login(username, password);
        const payload = {
            id: login,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        }
        const token = await sign(payload, secret as string);
        setCookie(c, "token", token, { httpOnly: true, maxAge: 60 * 60 * 24 });
        return c.json({
            success: true,
            message: "Login success",
            id: login
        })
    } catch (err) {
        console.log(err);
        return c.json({
            success: false,
            message: err instanceof Error ? err.message : "Unkown Error",
        });
    }
})
userController.post("/me", async (c: Context) => {
    try {
        const { id } = await c.req.json();
        const getProfile = await dbUsers.getById(id);
        return c.json({
            success: true,
            message: "User Found",
            profile: getProfile,
        })
    } catch (err) {
        return c.json({
            success: false,
            message: err instanceof Error ? err.message : "Unknown Error"
        })
    }
})

userController.delete("/logout", async (c: Context) => {
    try {
        deleteCookie(c, "token");
        return c.json({
            success: true,
            message: "Success logout"
        })
    }
    catch (err) {
        return c.json({
            success: false,
            message: err instanceof Error ? err.message : "Unknown Error",
        })
    }
})

export default userController;