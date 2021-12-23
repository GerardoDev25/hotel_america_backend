import { Schema, model } from 'mongoose';
import { ROLES } from '../settings';

const roles = Array.from(ROLES);

const userSchema = Schema({
  age: { type: Number },
  image: { type: String },
  email: { type: String, unique: true },
  state: { type: Boolean, default: true },
  name: { type: String, required: [true, 'name is required'] },
  lastName: { type: String, required: [true, 'last name is required'] },
  userName: { type: String, required: [true, 'last name is required'] },
  password: { type: String, required: [true, 'the password is required'] },
  role: {
    type: String,
    required: true,
    enum: [...roles],
  },
});

export default model('User', userSchema);
