import { Schema, model, SchemaTypes } from 'mongoose';
import { ROLES_STAFF } from '../settings';

const staffSchema = Schema({
  active: { type: SchemaTypes.Boolean, default: true },
  role: { type: SchemaTypes.String, required: true, enum: ROLES_STAFF },
  age: { type: SchemaTypes.Number, required: [true, 'age is required'] },
  name: { type: SchemaTypes.String, required: [true, 'name is required'] },
  phone: { type: SchemaTypes.Number, required: [true, 'phone is required'] },
  password: { type: SchemaTypes.String, required: [true, 'the password is required'] },

});

staffSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { staffId: _id, ...data };
};

export default model('Staff', staffSchema);
