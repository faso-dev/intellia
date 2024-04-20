import {z} from 'zod';


const ConversationSchema = z.object({
    subject: z.string().min(3, "Le sujet de la conversation doit contenir au moins 3 caractères").max(500, "Le sujet de la conversation doit contenir au maximum 50 caractères"),
});

type ConversationType = z.infer<typeof ConversationSchema>;

export type {
    ConversationType
}

export {
    ConversationSchema
}
