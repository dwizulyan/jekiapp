import { Prisma } from "@prisma/client";
import { NotFoundError } from "./NotFoundError.js";
import { ValidationError } from "./ValidationError.js";

export function handleError(err: unknown): never {

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Known Prisma error:", err.message);
        throw new Error("Database error: " + err.message);
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        console.error("Validation error:", err.message);
        throw new Error("Invalid input data");
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error("Unknown request error:", err.message);
        throw new Error("Unknown database error occurred");
    }
    if (err instanceof NotFoundError) {
        if (err.statusCode) {
            throw err;
        }
        throw new Error("Internal Server Error");
    }
    if (err instanceof ValidationError) {
        if (err.statusCode) {
            throw err;
        }
        throw new Error("Internal Server Error");
    }

    if (err instanceof Error) {
        console.error("Generic error:", err.message);
        throw err;
    }

    console.error("Unhandled non-error thrown:", err);
    throw new Error("Unknown error occurred");
}