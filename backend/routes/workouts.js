import express from 'express';
import { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
import requireAuth from '../middleware/requireAuth.js';


const router = express.Router();
router.use(requireAuth);
router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout); 

router.put('/:id', updateWorkout);

export default router;

