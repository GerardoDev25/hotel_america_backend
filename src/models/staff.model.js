import { Schema, model } from 'mongoose';
import { ROLES } from '../settings';

const roles = Array.from(ROLES);

const staffSchema = Schema({
  name: { type: String, required: [true, 'name is required'] },
  password: { type: String, required: [true, 'the password is required'] },
  age: { type: Number },
  active: { type: Boolean, default: true },
  phone: { type: Number },
  role: {
    type: String,
    required: true,
    enum: [...roles],
  },
});

staffSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { staffId: _id, ...data };
};

export default model('Staff', staffSchema);
