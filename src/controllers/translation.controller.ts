import {Context} from "hono";
import {Validator} from "../../core/validator";
import TranslationSchema from "../models/translation";
import {TranslationRepository} from "../repositories/translation.repository";
import {TranslatorService} from "../services/translator.service";
import {TranslationContentSchema} from "../validations/translation.schema";


export class TranslationController {
    async search({json, req}: Context) {
        const {page = 1, limit = 10, q: search = ''} = req.query();
        
        const data = await TranslationRepository.make().paginate({
            page: parseInt(String(page)),
            limit: parseInt(String(limit)),
            search,
            orderBy: 'createdAt',
            orderOrientation: 'desc'
        })
        return json({
            items: data.docs,
            page: data.page,
            limit: data.limit,
            total: data.total,
            hasNextPage: data.hasNextPage,
            hasPrevPage: data.hasPrevPage,
            nextPage: data.nextPage,
            prevPage: data.prevPage
        });
    }
    
    async translate({json, req, get}: Context) {
        const {id: userId} = get('user')
        const {content, sourceLanguage, targetLanguage, contentType} = await req.json();
        const validations = Validator.validate({content, sourceLanguage, targetLanguage, contentType}, TranslationContentSchema);
        
        if (!validations.isValidated) {
            return json({
                violations: validations.violations,
                message: "Please provide a valid translation content"
            }, 422)
        }
        
        const translatedContent = await TranslatorService.translate({
            content,
            sourceLang: sourceLanguage as "en" | "fr" | "de",
            targetLang: targetLanguage as "en" | "fr" | "de"
        })
        
        const translation = new TranslationSchema({
            sourceLang: sourceLanguage,
            targetLang: targetLanguage,
            sourceContent: content,
            targetContent: translatedContent,
            contentType: "text",
            userId
        })
        
        return json({
            item: await TranslationRepository.make().create(translation)
        }, 201)
    }
}
