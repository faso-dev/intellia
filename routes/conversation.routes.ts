import {Hono} from "hono";
import {ChatController} from "../src/controllers/chat.controller";
import {requireAuth} from "../src/middlewares";


const conversationController = new ChatController()
const conversationRoutes = new Hono().basePath('/chat/conversations')

conversationRoutes.get('', requireAuth, conversationController.search)

conversationRoutes.post('', requireAuth, conversationController.create)

conversationRoutes.get('/:id/messages', requireAuth, conversationController.getMessages)

conversationRoutes.post('/:id/messages', requireAuth, conversationController.sendMessage)

conversationRoutes.patch('/:id', requireAuth, conversationController.updateConversation)

export {conversationRoutes}
