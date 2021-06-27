export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: number;
    created_at: number;
    modified_at: number;
    deleted_at: number | null;
}  