import { Router } from 'express';


import * as controller from '../controllers/authController';

const  authRouter = Router();

//POST /api/v1/auth/register - Đăng ký tài khoản mới
authRouter.post('/register', controller.register);

//POST /api/v1/auth/login - đăng nhập, lấy access + refresh token
authRouter.post('/login', controller.login);

//POST /api/v1/auth/refresh lấy access token mới bằng refresh token
authRouter.post('/refresh', controller.refresh);

//GET /api/v1/auth/me - thông tin user hiện tại (cần token)
authRouter.get('/me', controller.me);

//POST /api/v1/auth/logout - đăng xuất, revoke refresh token (cần token)
authRouter.post('/logout', controller.logout);