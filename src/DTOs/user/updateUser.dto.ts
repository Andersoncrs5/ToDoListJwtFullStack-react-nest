export default interface UpdateUserDto {
    name?: string | null
    email?: string | null
    password?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
}