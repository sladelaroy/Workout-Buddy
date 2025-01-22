import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';  

import workoutRoutes from './routes/workouts.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/workouts', workoutRoutes)

app.get('/', (req, res) => { 
  res.json({mssg: 'Welcome to workout buddy'});
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});