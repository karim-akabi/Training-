import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
export const apiRouter = Router();
apiRouter.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        message: 'Express logic tier is ready',
    });
});
apiRouter.get('/users', async (_req, res) => {
    const users = await User.find().lean();
    res.json(users);
});
apiRouter.get('/teams', async (_req, res) => {
    const teams = await Team.find().lean();
    res.json(teams);
});
apiRouter.get('/activities', async (_req, res) => {
    const activities = await Activity.find().lean();
    res.json(activities);
});
apiRouter.get('/workouts', async (_req, res) => {
    const workouts = await Workout.find().lean();
    res.json(workouts);
});
apiRouter.get('/leaderboard', async (_req, res) => {
    const users = await User.find().lean();
    const leaderboard = users
        .map((user, index) => ({
        rank: index + 1,
        name: user.name,
        fitnessLevel: user.fitnessLevel,
    }))
        .sort((a, b) => a.rank - b.rank);
    res.json(leaderboard);
});
