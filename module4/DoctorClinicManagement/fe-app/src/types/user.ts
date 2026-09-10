export interface UserInfo {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        name: string;
        role: string
    }
}