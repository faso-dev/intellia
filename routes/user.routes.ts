import {Hono} from "hono";


const userRoutes = new Hono().basePath('/users')


export {userRoutes}
