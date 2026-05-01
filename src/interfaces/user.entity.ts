export type UserType = "Client" | "Admin"

export type AdminType = 'Location Admin' | 'Super Admin' | "Not Admin"

export interface User {
    userId: number;
    userType: UserType;
    adminType: AdminType
    name: string;
    surname: string;
    email: string;
    password: string;
}
