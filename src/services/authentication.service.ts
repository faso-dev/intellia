import {LoginType, RefreshTokenType} from "../../types";


const AuthenticationService = {
    async login({username, password} : LoginType) {
        // fecth user from database with the given password
        
        // if user not found, return error
        
        // verify password
        
        // call TokenService.generateToken
    },
    async refreshToken({refreshToken} : RefreshTokenType) {
        // verify the refresh token
        
        // call TokenService.generateToken
    }
}
