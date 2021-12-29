import { Schema, model, SchemaTypes } from 'mongoose';
import { DESCRIPTION_ROLES } from '../settings';

const roles = Array.from(DESCRIPTION_ROLES);

const amountSchema = Schema({
  description: { type: SchemaTypes.String },
  totalAmount: { type: SchemaTypes.Number, required: [true, 'amount is required'] },
  role: { type: SchemaTypes.String, enum: [...roles], required: [true, 'type requered or invalid'] },

  staffId: { type: SchemaTypes.ObjectId, ref: 'Staff', required: [true, 'id staff is required'] },
  registerId: { type: SchemaTypes.ObjectId, ref: 'Register', required: [true, 'id register is required'] },
});

amountSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { amountId: _id, ...data };
};

export default model('Amount', amountSchema);
