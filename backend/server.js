import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';  
import cors from 'cors'
import workoutRoutes from './routes/workouts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({
  origin: 'http://localhost:3000'  
}));

app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});