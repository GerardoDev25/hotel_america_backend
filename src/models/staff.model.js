import { Schema, model, SchemaTypes } from 'mongoose';
import { ROLES_STAFF } from '../helpers/settings';

const staffSchema = new  Schema({
  role: { type: SchemaTypes.String, required: true, enum: ROLES_STAFF },
  age: { type: SchemaTypes.Number, required: [true, 'age is required'] },
  name: { type: SchemaTypes.String, required: [true, 'name is required'], unique: true },
  phone: { type: SchemaTypes.Number, required: [true, 'phone is required'], unique: true },
  username: { type: SchemaTypes.String, required: [true, 'user name is required'], unique: true },
  password: { type: SchemaTypes.String, required: [true, 'the password is required'], unique: true },
});

staffSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { staffId: _id, ...data };
};

export default model('Staff', staffSchema);
