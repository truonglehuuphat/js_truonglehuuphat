import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../db/prisma';
import { AppError } from '../types/api';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFESH_SECRET = process.env.JWT_REFESH_SECRET!;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || '15m';
const REFESH_EXPIRES = process.env.JWT_REFESH_EXPIRES || '7d';

interface TokenUser {
    id: number;
    email: string;
    role: string;
}

//Helper tạo cặp access + refresh token
function generateTokens(user: TokenUser) {
    const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, ACCESS_EXPIRES, { expiresIn: '15m' } as SignOptions);
    const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, REFESH_EXPIRES, { expiresIn: '15m' } as SignOptions);
    return { accessToken, refreshToken };
}

// 
// Register - đăng ký tài khoản mới
// 
export async function register(input: {
    name: string;
    email: string;
    password: string;
}) {
    // user is exist compare password by email
    const checkUser = await prisma.user.findUnique({ where: { email: input.email } });
    if (checkUser) throw new AppError(401, "Email đã được đăng ký");
    // Hash password 
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    // save database
    const newUser = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
        },
    })
    return newUser;
}

// 
// login - đăng nhập và cấp token
// 
export async function login(input: {
    email: string;
    password: string;
}) {
    // find user by email
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    // check user is exist and password is correct
    // khong thong bao email khong ton tai hay sai password tranh ro ri thong tin
    const isValid = user && await bcrypt.compare(input.password, user.password);
    if (!isValid) throw new AppError(401, "Email hoặc mật khẩu không đúng");

    // create token
    const tokens = generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    // save refreshtoken into DB
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
    });

    // return tokens and infor user ( no password)
    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
            id: user.id,
            name: user.name
        }
    }
}

// 
// Refresh - cấp cặp token mới (rotation)
// 
export async function refreshTokens(oldRefreshToken: string) {
    // verify refresh token
    let payload: { id: number };
    try {
        payload: jwt.verify(oldRefreshToken, REFESH_SECRET) as { id: number };
    } catch (error) {
        throw new AppError(401, 'Refresh token is invalid or expired');
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.id }
    });

    if (!user || user.refreshToken != oldRefreshToken) {
        throw new AppError(401, 'Refresh is recall');
    }
    const tokens = generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
}

// 
// logout - revoke refresh token
// 
export async function logout(userId: number) {
    await prisma.user.update({
        where: {id: userId},
        data: {refreshToken: null},
    });
}

// 
// Lấy thông tin user hiện tại
// 
export async function getPorfile(userId: number) {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
    if(!user ) throw new AppError(404, "No data");
    return user;
}

