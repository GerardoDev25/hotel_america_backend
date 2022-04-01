import { Schema, model, SchemaTypes } from 'mongoose';

import { getFullDate } from '../helpers/settings';

/**
 * @module Models
 */

/**
 * @name cafeSchema of the cafe
 * @type {Schema}
 */
const cafeSchema = new Schema({
  active: { type: SchemaTypes.Boolean, default: false },
  date: { type: SchemaTypes.String, default: getFullDate() },
  name: { type: SchemaTypes.String, required: [true, 'name is required'] },
  numberRoom: { type: SchemaTypes.Number, required: [true, 'the room number is required'] },

  goestId: { type: SchemaTypes.ObjectId, ref: 'Goest', required: [true, 'id register is required'] },
  registerId: { type: SchemaTypes.ObjectId, ref: 'Register', required: [true, 'id register is required'] },
});

cafeSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { cafeId: _id, ...data };
};


export default model('Cafe', cafeSchema);
