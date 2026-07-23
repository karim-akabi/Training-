import mongoose, { Schema, type Model } from 'mongoose';

export interface IWorkout {
  name: string;
  focus: string;
  duration: number;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  duration: { type: Number, required: true },
});

export const Workout: Model<IWorkout> = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
