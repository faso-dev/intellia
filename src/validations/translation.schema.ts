import {z} from 'zod';


const TranslationContentSchema = z.object({
    sourceLanguage: z.enum(["en", "fr", "de"], {
        invalid_type_error: "La langue source doit être soit en, fr ou de",
        required_error: "La langue source est requise"
    }),
    targetLanguage: z.enum(["en", "fr", "de"], {
        invalid_type_error: "La langue cible doit être soit en, fr ou de",
        required_error: "La langue cible est requise"
    }),
    content: z.string().min(2, "Le contenu source doit contenir au moins 2 caractères").max(500, "Le contenu source doit contenir au maximum 500 caractères"),
    contentType: z.enum(["text", "pdf", "audio"], {
        invalid_type_error: "Le type de contenu doit être soit text, pdf ou audio",
        required_error: "Le type de contenu est requis"
    })
}).refine(data => data.sourceLanguage !== data.targetLanguage, {
    message: "La langue source et la langue cible ne peuvent pas être les mêmes",
    path: ["sourceLanguage", "targetLanguage"]
});

type TranslationContentType = z.infer<typeof TranslationContentSchema>;

export type {
    TranslationContentType
}

export {
    TranslationContentSchema
}
