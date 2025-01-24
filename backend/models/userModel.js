import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from 'validator'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }, 

  password: {
    type: String,
    required: true
  }
});

// static signup method
userSchema.statics.signup = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Not an email')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const User = this;

  const exist = await User.findOne({email});
  if (exist) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({email, password: hash});

  return user;
}

userSchema.statics.login = async function(email, password) {
  const User = this;
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await User.findOne({email});
  if (!user) {
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect Password')
  }

  return user
}

export default mongoose.model('User', userSchema);