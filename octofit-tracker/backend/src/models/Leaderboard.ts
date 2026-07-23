import mongoose, { Schema, type Model } from 'mongoose';

export interface ILeaderboardEntry {
  name: string;
  score: number;
  team: string;
  badges: string[];
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  team: { type: String, required: true },
  badges: [{ type: String, required: true }],
});

export const Leaderboard: Model<ILeaderboardEntry> =
  mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
