import { Schema, model, SchemaTypes } from 'mongoose';
import { getFullDate } from '../helpers/settings';

const goestSchema = Schema({
  city: { type: SchemaTypes.String, default: '' },
  date: { type: SchemaTypes.String, default: getFullDate() },
  name: { type: SchemaTypes.String, required: [true, 'name is required'] },
  origin: { type: SchemaTypes.String, required: [true, 'origin is required'] },
  posting: { type: SchemaTypes.String, required: [true, 'posting is required'] },
  lastName: { type: SchemaTypes.String, required: [true, 'last name is required'] },
  ci: { type: SchemaTypes.String, required: [true, 'ci is required'], unique: true },
  dateOfBirth: { type: SchemaTypes.String, required: [true, 'birth day is required'] },
  phone: { type: SchemaTypes.Number, required: [true, 'phone is required'], unique: true },
  numberRoom: { type: SchemaTypes.Number, required: [true, 'the room number is required'] },

  registerId: { type: SchemaTypes.ObjectId, ref: 'Register', required: true },
});

goestSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { goestId: _id, ...data };
};

export default model('Goest', goestSchema);
