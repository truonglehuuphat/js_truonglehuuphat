import { Router } from 'express';
import { loginSchema, registerSchema } from '../schema/authSchema'

import * as controller from '../controllers/authController';
import { validate } from '../mildware/validate';

const authRouters = Router();

//POST /api/v1/auth/register - Đăng ký tài khoản mới
authRouters.post('/register', validate(registerSchema), controller.register);

//POST /api/v1/auth/login - đăng nhập, lấy access + refresh token
authRouters.post('/login', validate(loginSchema), controller.login);

//POST /api/v1/auth/refresh lấy access token mới bằng refresh token
authRouters.post('/refresh', controller.refresh);

//GET /api/v1/auth/me - thông tin user hiện tại (cần token)
authRouters.get('/me', controller.me);

//POST /api/v1/auth/logout - đăng xuất, revoke refresh token (cần token)
authRouters.post('/logout', controller.logout);

export default authRouters;