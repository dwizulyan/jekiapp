export type IUsers = {
    id: number,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt?: Date | null,
}