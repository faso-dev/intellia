import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import {prettyJSON} from 'hono/pretty-json'
import {db} from "./database";
import {authRoutes, conversationRoutes, translationRoutes} from "./routes";
import {errorHandler, notFound} from "./src/middlewares";


const app = new Hono().basePath('/api/v1')

// connect to the database
void db.connect()

// Initialize middleware
app.use('*', logger(), prettyJSON())

// Cors
app.use(
    '*',
    cors({
        origin: '*',
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
)


app.route('', authRoutes)
app.route('', conversationRoutes)
app.route('', translationRoutes)

app.onError((err, c) => {
    return errorHandler(c, (err as any).status || 500)
})

app.notFound((c) => {
    return notFound(c)
})

const PORT = parseInt(process.env.PORT || "8009")
console.log(`Server is running on port ${PORT}`)

serve({
    fetch: app.fetch,
    port: PORT
})
