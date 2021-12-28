import { Schema, model } from 'mongoose';
import { DESCRIPTION_ROLES } from '../settings';

const roles = Array.from(DESCRIPTION_ROLES);

const descriptionSchema = Schema({
  amount: { type: Number, required: [true, 'amount is required'] },
  description: { type: String },
  registerId: {
    type: Schema.Types.ObjectId,
    ref: 'Register',
    required: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: [...roles],
  },
});

descriptionSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { descriptionId: _id, ...data };
};

export default model('Description', descriptionSchema);
