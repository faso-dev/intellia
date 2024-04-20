import {Context, Next} from "hono";
import {IUser} from "../models/user";
import {UserRepository} from "../repositories/user.repository";
import {TokenService} from "../services/token.service";
import { HTTPException } from 'hono/http-exception'
import { StatusCode } from "hono/utils/http-status";

export const errorHandler = (c: Context, status: number = 401) => {
    return c.json({
        success: false,
        message: c.error?.message,
        stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
    }, status as StatusCode)
}

export const notFound = (c: Context) => {
    return c.json({
        success: false,
        message: `Not Found - [${c.req.method}] ${c.req.url}`,
    }, 404)
}
export const requireAuth = async (c: Context, next: Next) => {
    let token;
    
    if (
        c.req.header('Authorization') &&
        c.req.header('Authorization')?.startsWith('Bearer')
    ) {
        try {
            token = c.req.header('Authorization')?.replace(/Bearer\s+/i, '');
            if (!token) {
                return c.json({message: "Vous n'êtes pas autorisé à accéder à cette ressource!"}, 401);
            }
            
            const {id} = await TokenService.verifyToken(token);
            const user = await UserRepository.make().findById(id, undefined, '-password');
            c.set('user', user);
            await next();
        } catch (err) {
            throw new HTTPException(
                401,
                {message: "Votre jeton d'authentification n'est pas valide ou a expiré! Veuillez vous connecter à nouveau."}
            );
        }
    } else {
        return c.json({message: "Vous n'êtes pas autorisé à accéder à cette ressource!"}, 401);
    }
};

export const hasRole = async (c: Context, role: "ROLE_USER" | "ROLE_ADMIN") => {
    const ROLES_HIERARCHY = {
        ROLE_ADMIN: ['ROLE_USER'] as const,
    }
    
    const user: IUser = c.get('user');
    
    if (!user) {
        return false;
    }
    
    if (role === 'ROLE_USER' && user.role === 'ROLE_USER') {
        return true;
    }
    
    if (role === 'ROLE_ADMIN' && user.role === 'ROLE_ADMIN') {
        return true;
    }
    
    return role === 'ROLE_USER' && user.role === 'ROLE_ADMIN';
    
};
