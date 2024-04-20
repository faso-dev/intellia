import {Context} from "hono";


export class UserController {
    async search({json, req}: Context) {
        return json({message: 'Hello, World!'});
    }
}
