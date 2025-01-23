import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';  
import cors from 'cors'
import workoutRoutes from './routes/workouts.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'  
}));

app.use('/api/workouts', workoutRoutes)

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});