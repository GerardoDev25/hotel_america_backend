import { Schema, model, SchemaTypes } from 'mongoose';

import { getAndAddFullDate, getFullDate } from '../helpers/settings';

/**
 * @module Models
 */

/**
 * @name registerSchema of the register
 * @type {Schema}
 */
const registerSchema = new Schema({
  checkOut: { type: SchemaTypes.String, default: getAndAddFullDate(1) },
  discount: { type: SchemaTypes.Number, default: 0 },
  numGoest: { type: SchemaTypes.Number, default: 1 },
  checkIn: { type: SchemaTypes.String, default: getFullDate() },
  price: { type: SchemaTypes.Number, required: [true, 'the price is required'] },
  numberRoom: { type: SchemaTypes.Number, required: [true, 'room number is required'], unique: true },

  roomId: { type: SchemaTypes.ObjectId, ref: 'Room', required: true },
  staffId: { type: SchemaTypes.ObjectId, ref: 'Staff', required: true },
});

registerSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { registerId: _id, ...data };
};

export default model('Register', registerSchema);
