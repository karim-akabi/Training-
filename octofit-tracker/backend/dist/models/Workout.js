import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, required: true },
});
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
