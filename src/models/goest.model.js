import { Schema, model, SchemaTypes } from 'mongoose';

const goestSchema = Schema({
  name: { type: String, required: [true, 'name is required'] },
  lastName: { type: String, required: [true, 'last name is required'] },
  ci: { type: String, required: [true, 'ci is required'], unique: true },
  email: { type: String, unique: true },
  role: { type: String, default: 'role_guest' },
  origin: { type: String, required: [true, 'origin is required'] },
  posting: { type: String, required: [true, 'posting is required'] },
  phone: { type: Number },
  home: { type: String },
  city: { type: String },
  dateOfBirth: { type: SchemaTypes.Date },
  state: { type: Boolean, default: true },
  registerId: {
    type: Schema.Types.ObjectId,
    ref: 'Register',
    required: true,
  },
});

goestSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { goestId: _id, ...data };
};

export default model('Goest', goestSchema);
