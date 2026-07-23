import 'dotenv/config';
import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await Workout.deleteMany({});
        const users = await User.insertMany([
            { name: 'Ava Patel', email: 'ava@example.com', fitnessLevel: 'Advanced' },
            { name: 'Liam Chen', email: 'liam@example.com', fitnessLevel: 'Intermediate' },
            { name: 'Mia Rodriguez', email: 'mia@example.com', fitnessLevel: 'Beginner' },
        ]);
        await Team.insertMany([
            { name: 'Trail Blazers', members: users.map((user) => user.name) },
            { name: 'Core Crew', members: ['Ava Patel', 'Mia Rodriguez'] },
        ]);
        await Activity.insertMany([
            { userId: users[0]._id.toString(), type: 'Run', duration: 40, date: new Date() },
            { userId: users[1]._id.toString(), type: 'Cycling', duration: 55, date: new Date() },
            { userId: users[2]._id.toString(), type: 'Yoga', duration: 30, date: new Date() },
        ]);
        await Workout.insertMany([
            { name: 'HIIT Sprint', focus: 'Cardio', duration: 25 },
            { name: 'Strength Circuit', focus: 'Muscle', duration: 45 },
            { name: 'Mobility Flow', focus: 'Recovery', duration: 20 },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
