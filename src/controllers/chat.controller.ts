import {Context} from "hono";
import {Validator} from "../../core/validator";
import Conversation from "../models/conversation";
import MessageSchema from "../models/message";
import {ConversationRepository} from "../repositories/conversation.repository";
import {MessageRepository} from "../repositories/message.repository";
import {BotService} from "../services/bot.service";
import {ConversationSchema} from "../validations/conversation.schema";
import {MessageSchema as BotMessageSchema} from "../validations/message.schema";


export class ChatController {
    
    async index({json}: Context) {
        return json({
            content: await BotService.present()
        })
    }
    
    async search({json, req, get}: Context) {
        const {id} = get('user');
        return json({
            items: await ConversationRepository.make().findByUserId(id)
        });
    }
    
    async create({json, req, get}: Context) {
        const {question} = await req.json()
        const {id} = get('user');
        const validation = Validator.validate({userQuestion: question}, BotMessageSchema);
        
        if (validation.isValidated) {
            const answer = await BotService.prompt(question)
            const conversation = new Conversation({
                subject: question,
                userId: id,
            })
            
            const conversationDoc = await ConversationRepository.make().create(conversation)
            
            const message = new MessageSchema({
                conversationId: conversationDoc._id,
                userQuestion: question,
                assistantReply: answer
            })
            
            const messageDoc = await MessageRepository.make().create(message)
            
            return json({
                item: {
                    conversation: conversationDoc,
                    message: messageDoc
                }
            }, 201)
        }
        return json({
            violations: validation.violations,
            message: "Please provide a valid question"
        }, 422)
    }
    
    async getMessages({json, req, get}: Context) {
        const {limit = 16, q: search = '', page = 1} = req.query()
        const conversationId = req.param('id')
        const {id} = get('user');
        const conversation = await ConversationRepository.make().findById(conversationId, {userId: id})
        
        if (!conversation) {
            return json({message: 'Conversation not found'}, 404)
        }
        if (conversation.userId.toString() !== id) {
            return json({message: 'Unauthorized'}, 401)
        }
        
        const data = await MessageRepository.make().paginate({
            page: parseInt(String(page), 10),
            limit: parseInt(String(limit), 10),
            search,
            filters: {conversationId}
        })
        return json({
            items: data.docs,
            metadata: {
                total: data.total,
                page: data.page,
                limit: data.limit,
                hasNextPage: data.hasNextPage,
                hasPrevPage: data.hasPrevPage,
                nextPage: data.nextPage,
                prevPage: data.prevPage
            }
        });
    }
    
    async sendMessage({json, req}: Context) {
        const conversationId = req.param('id')
        const {question} = await req.json()
        const validation = Validator.validate({userQuestion: question}, BotMessageSchema);
        
        if (!validation.isValidated) {
            return json({
                violations: validation.violations,
                message: "Please provide a valid question"
            }, 422)
        }
        
        const conversation = await ConversationRepository.make().findById(conversationId)
        
        if (!conversation) {
            return json({message: 'Conversation not found'}, 404)
        }
        
        const answer = await BotService.prompt(question)
        
        const message = new MessageSchema({
            conversationId: conversation._id,
            userQuestion: question,
            assistantReply: answer
        })
        
        const messageDoc = await MessageRepository.make().create(message)
        
        return json({
            item: messageDoc
        }, 201);
    }
    
    async updateConversation({json, req}: Context) {
        const {title} = await req.json()
        const conversationId = req.param('id')
        
        const validation = Validator.validate({subject: title}, ConversationSchema);
        
        if (!validation.isValidated) {
            return json({
                violations: validation.violations,
                message: "Please provide a valid title"
            }, 422)
        }
        
        const conversation = await ConversationRepository.make().findById(conversationId)
        
        if (!conversation) {
            return json({message: 'Conversation not found'}, 404)
        }
        
        return json({
            item: await ConversationRepository.make().update({_id: conversationId}, {subject: title})
        });
    }
}
