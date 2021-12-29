import { Schema, model, SchemaTypes } from 'mongoose';
import { ROLES_STAFF } from '../settings';

const staffSchema = Schema({
  age: { type: SchemaTypes.Number },
  phone: { type: SchemaTypes.Number },
  active: { type: SchemaTypes.Boolean, default: true },
  name: { type: SchemaTypes.String, required: [true, 'name is required'] },
  password: { type: SchemaTypes.String, required: [true, 'the password is required'] },

  role: { type: SchemaTypes.String, required: true, enum: ROLES_STAFF },
});

staffSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { staffId: _id, ...data };
};

export default model('Staff', staffSchema);
