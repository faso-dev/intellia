import mongoose, { Schema, Document } from 'mongoose';

export interface ITranslation extends Document {
    userId: string;
    sourceLang: string;
    targetLang: string;
    sourceContent: string;
    targetContent: string;
    contentType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const TranslationSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        sourceLang: { type: String, required: true },
        targetLang: { type: String, required: true },
        sourceContent: { type: String, required: true },
        targetContent: { type: String, required: true },
        contentType: { type: String, enum: ['text', 'pdf', 'audio'], required: true, default: 'text'},
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deletedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.model<ITranslation>('Translation', TranslationSchema);
