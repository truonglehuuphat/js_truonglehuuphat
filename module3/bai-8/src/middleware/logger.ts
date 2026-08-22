import jwt from "jsonwebtoken"

const ACSSESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

// tao access token
function signAccessToken(payload: {id: number, email: string; role: string}){
    return jwt.sign(payload, ACSSESS_SECRET, {expiresIn: "15m"});
}

// tao refresh token het han sau 7 ngay
function signRefreshToken(payload: {id: number}){
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: "2h"});
}

//verify token
function verifyAccessToken(token: string){
    return jwt.verify(token, ACSSESS_SECRET);
    // neu het hajn -> throw tokenExpiredError
    // neu sai token -> throw jsonWebTokenError
}
