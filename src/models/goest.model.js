import { Schema, model, SchemaTypes } from 'mongoose';

const goestSchema = Schema({
  home: { type: SchemaTypes.String, default: '' },
  city: { type: SchemaTypes.String, default: '' },
  phone: { type: SchemaTypes.Number, default: 0 },
  state: { type: SchemaTypes.Boolean, default: true },
  role: { type: SchemaTypes.String, default: 'role_guest' },
  name: { type: SchemaTypes.String, required: [true, 'name is required'] },
  origin: { type: SchemaTypes.String, required: [true, 'origin is required'] },
  posting: { type: SchemaTypes.String, required: [true, 'posting is required'] },
  lastName: { type: SchemaTypes.String, required: [true, 'last name is required'] },
  dateOfBirth: { type: SchemaTypes.Number, required: [true, 'birth day is required'] },
  ci: { type: SchemaTypes.String, required: [true, 'ci is required'], unique: true },
  numberRoom: { type: SchemaTypes.Number, required: [true, 'the room number is required'] },

  registerId: { type: SchemaTypes.ObjectId, ref: 'Register', required: true },
});

goestSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { goestId: _id, ...data };
};

export default model('Goest', goestSchema);
