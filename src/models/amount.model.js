import { Schema, model, SchemaTypes } from 'mongoose';

import { DESCRIPTION_AMOUNTS, getFullDate } from '../helpers/settings';

/**
 * @todo receipt number
 */

/**
 * @module Models
 */

/**
 * @name amountSchema of the amount
 * @type {Schema}
 */
const amountSchema = new Schema({
  description: { type: SchemaTypes.String, default: '' },
  date: { type: SchemaTypes.String, default: getFullDate() },
  totalAmount: { type: SchemaTypes.Number, required: [true, 'amount is required'] },
  type: { type: SchemaTypes.String, enum: DESCRIPTION_AMOUNTS, required: [true, 'type requered or invalid'] },

  staffId: { type: SchemaTypes.ObjectId, ref: 'Staff', required: [true, 'id staff is required'] },
  registerId: { type: SchemaTypes.ObjectId, ref: 'Register', required: [true, 'id register is required'] },
});

amountSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { amountId: _id, ...data };
};

export default model('Amount', amountSchema);
