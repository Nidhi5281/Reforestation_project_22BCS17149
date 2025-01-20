export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}