import {Context} from "hono";
import {Validator} from "../../core/validator";
import User from "../models/user";
import {UserRepository} from "../repositories/user.repository";
import {PasswordService} from "../services/password.service";
import {TokenService} from "../services/token.service";
import {RegisterUserSchema} from "../validations/user.schema";


export class AuthController {
    
    async login({json, req}: Context) {
        const {username, password} = await req.json();
        const user = await UserRepository.make().findByUsername(username);
        if (!user) {
            return json({message: "Invalid username or password"}, 401);
        }
        if (!PasswordService.verify(password, user.password)) {
            return json({message: "Invalid username or password"}, 401);
        }
        const token = await TokenService.generateToken({
            payload: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        });
        const refreshToken = await TokenService.generateRefreshToken({
            payload: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        });
        // update user refresh token
        await UserRepository.make().update(user._id, {refreshToken});
        
        return json({
            access_token: token,
            token_type: 'Bearer',
            refresh_token: refreshToken,
        });
    }
    
    async refreshToken({json, req}: Context) {
        const {refresh_token} = await req.json();
        const {id} = await TokenService.verifyRefreshToken(refresh_token);
        const user = await UserRepository.make().findOne({id}, '-password');
        if (!user) {
            return json({message: "Invalid refresh token"}, 401);
        }
        if (user.refreshToken !== refresh_token) {
            return json({message: "Invalid refresh token"}, 401);
        }
        const token = TokenService.generateToken({
            payload: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        });
        return json({
            access_token: token,
            token_type: 'Bearer',
        });
    }
    
    async register({req, json}: Context) {
        const {username, password} = await req.json();
        const validations = Validator.validate({username, password}, RegisterUserSchema);
        if (!validations.isValidated) {
            return json({
                message: 'Please provide a valid username and password',
                violations: validations.violations,
            }, 422);
        }
        const hashedPassword = PasswordService.hash(password);
        const user = new User({
            username,
            password: hashedPassword,
            role: 'ROLE_USER',
        });
        
        return json({
            item: await UserRepository.make().create(user)
        });
    }
    
    async profile({json, get}: Context) {
        return json({
            item: get('user')
        });
    }
    
    async updateProfile({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    async updateAvatar({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    async logout({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    async forgotPassword({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    async resetPassword({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    async verifyEmail({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    async resendVerificationEmail({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    async changePassword({json}: Context) {
        return json({message: 'Hello, World!'});
    }
    
    
}
