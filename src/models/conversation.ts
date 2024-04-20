import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
    subject: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const ConversationSchema: Schema = new Schema(
    {
        subject: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deletedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
