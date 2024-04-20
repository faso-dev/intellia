import {z} from 'zod';


const MessageSchema = z.object({
    userQuestion: z.string().min(2, "Votre question doit contenir au moins 2 caractères").max(500, "Votre question doit contenir au maximum 500 caractères"),
});

type MessageType = z.infer<typeof MessageSchema>;

export type {
    MessageType
}

export {
    MessageSchema
}
