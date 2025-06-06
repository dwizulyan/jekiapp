import { handleError } from "@/errors/HandleError.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import { ValidationError } from "@/errors/ValidationError.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

class UserModel {
    private prisma = new PrismaClient();
    async getAll() {
        try {
            const users = await this.prisma.users.findMany();
            return users;
        }
        catch (err) {
            handleError(err);
        }
    }
    async getById(id: number) {
        try {
            const users = await this.prisma.users.findFirst({
                where: {
                    id: id
                }
            });
            if (!users) {
                throw new NotFoundError(`No Users with id = ${id}`)
            }
            return users;
        }
        catch (err) {
            handleError(err);
        }
    }
    async create(email: string, username: string, password: string) {
        try {
            const hashed = await bcrypt.hash(password, 10);
            const create = this.prisma.users.create({
                data: {
                    username: username,
                    email: email,
                    password: hashed,
                }
            })
            return create;
        }
        catch (err) {
            handleError(err);
        }
    }
    async login(username: string, password: string) {
        try {
            const login = await this.prisma.users.findFirst({
                where: {
                    username: username
                }
            })
            if (!login) {
                throw new NotFoundError("Username doesn't exists");
            }
            if (await bcrypt.compare(password, login.password)) {
                return login.id;
            } else {
                throw new ValidationError("Password does not match")
            }
        }
        catch (err) {
            handleError(err);
        }
    }
}
export const dbUsers = new UserModel();