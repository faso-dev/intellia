import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    conversationId: string;
    userQuestion: string;
    assistantReply: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const MessageSchema: Schema = new Schema(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
        },
        userQuestion: { type: String, required: true },
        assistantReply: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deletedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.model<IMessage>('Message', MessageSchema);

