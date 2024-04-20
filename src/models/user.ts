import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    role: "ROLE_USER" | "ROLE_ADMIN";
    avatar?: string;
    lastName?: string;
    firstName?: string;
    phoneNumber?: string;
    refreshToken?: string;
    country?: string;
    email?: string;
    activated: boolean;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['ROLE_USER', 'ROLE_ADMIN'], default: 'ROLE_USER' },
        avatar: { type: String },
        lastName: { type: String },
        firstName: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
        refreshToken: { type: String },
        country: { type: String },
        activated: { type: Boolean, default: true },
        enabled: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deletedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.model<IUser>('User', UserSchema);
