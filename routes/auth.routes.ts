import {Hono} from "hono";
import {AuthController} from "../src/controllers/auth.controller";
import {requireAuth} from "../src/middlewares";


const authController = new AuthController()
const authRoutes = new Hono().basePath('/auth')

authRoutes.post('/login', authController.login)

authRoutes.post('/token/refresh', authController.refreshToken)

authRoutes.post('/register', authController.register)

authRoutes.get('/profile', requireAuth, authController.profile)

authRoutes.patch('/profile', requireAuth, authController.updateProfile)

authRoutes.post('profile/avatar', requireAuth, authController.updateAvatar)

export {authRoutes}
