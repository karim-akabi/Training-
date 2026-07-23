import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    team: { type: String, required: true },
    badges: [{ type: String, required: true }],
});
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
