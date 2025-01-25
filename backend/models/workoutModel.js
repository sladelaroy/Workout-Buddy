import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true});

export default mongoose.model('Workout', workoutSchema);