import mongoose, { Schema, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  fitnessLevel: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
