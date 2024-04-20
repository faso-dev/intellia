import {Jwt} from 'hono/utils/jwt';


const TokenService = {
    async generateToken({payload, expiresIn}: { payload: any, expiresIn?: number }) {
        return Jwt.sign({
            ...payload,
            // for 15 minutes
            exp: expiresIn || Math.floor(Date.now() / 1000) + 60 * 15,
        }, process.env.JWT_SECRET!!);
    },
    
    async verifyToken(token: string) {
        return Jwt.verify(token, process.env.JWT_SECRET!!);
    },
    
    async verifyRefreshToken(token: string) {
        return Jwt.verify(token, process.env.JWT_REFRESH_SECRET!!);
    },
    
    async generateRefreshToken({payload, expiresIn}: { payload: any, expiresIn?: number }) {
        return Jwt.sign({
            ...payload,
            exp: expiresIn || Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        }, process.env.JWT_REFRESH_SECRET!!);
    },
    
    async decodeToken(token: string) {
        return Jwt.decode(token);
    }
}

export {TokenService};
