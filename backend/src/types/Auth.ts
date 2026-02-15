export interface RegisterUserBody {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginUserBody {
    email: string;
    username: string;
    password: string;
}