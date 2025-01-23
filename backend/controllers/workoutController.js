import mongoose from "mongoose";
import Workout from '../models/workoutModel.js';



// get all workouts

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1});
  res.status(200).json(workouts);

}

// get a workout

const getWorkout = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({error: 'Workout not found'});
  }

  const workout = await Workout.findById(req.params.id);
  res.status(200).json(workout);

  if (!workout) {
    return res.status(404).json({error: 'Workout not found'});
  }

  res.status(200).json(workout);
}

// create a workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title')
  }

  if (!load) {
    emptyFields.push('load')
  }

  if (!reps) {
    emptyFields.push('reps')
  }

  if (emptyFields.length > 0) {
    return res.status(404).json({error: 'Please fill in all the fields', emptyFields})
  }

  try {
    const workout = await Workout.create({title, load, reps});
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({error: 'Error creating workout'});
  }
}


// delete a workout

const deleteWorkout = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({error: 'Workout not found'});
  }

  const workout = await Workout.findByIdAndDelete(req.params.id);
  res.status(200).json({error: 'Workout deleted'});

  if (!workout) {
    return res.status(400).json({error: 'Workout not found'});
  }
}

// update a workout
const updateWorkout = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({error: 'Workout not found'});
  }

  const workout = await Workout.findByIdAndUpdate(req.params.id, {
    ...req.body
  });

  if(!workout) {
    return res.status(400).json({error: 'Workout not found'});
  };

  res.status(200).json(workout)
}

export {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout};

