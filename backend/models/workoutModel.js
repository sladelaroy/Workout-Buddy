import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
  },
  load: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

export default mongoose.model('Workout', workoutSchema);