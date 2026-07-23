import mongoose, { Schema, type Model } from 'mongoose';

export interface ITeam {
  name: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: [{ type: String, required: true }],
});

export const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
