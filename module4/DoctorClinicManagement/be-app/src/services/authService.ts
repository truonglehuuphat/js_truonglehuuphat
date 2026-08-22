

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFESH_SECRET = process.env.JWT_REFESH_SECRET!;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || '15m';
const REFESH_EXPIRES = process.env.JWT_REFESH_EXPIRES || '7d';

interface TokenUser{
    id: number;
    email: string;
    role: string;
}

//Helper tạo cặp access + refresh token
function generateToken(user: TokenUser){

}

// 
// Register - đăng ký tài khoản mới
// 
export async function register(input: {
    name: String;
    email: String;
    password: String;
}) {

}

// 
// login - đăng nhập và cấp token
// 
export async function login(input: {
    email:string;
    password: string;
}){

}

// 
// Refresh - cấp cặp token mới (rotation)
// 
export async function refreshTokens(oldRefreshToken: string){

}

// 
// logout - revoke refresh token
// 
export async function logout(userId: number){

}

// 
// Lấy thông tin user hiện tại
// 
export async function getPorfile(userId: number ){

}

