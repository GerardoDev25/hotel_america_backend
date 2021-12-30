import { Schema, model, SchemaTypes } from 'mongoose';
import moment from 'moment';

import 'moment/locale/es-mx';
moment.locale('es-mx');

const registerSchema = Schema({
  discount: { type: SchemaTypes.Number, default: 0 },
  checkIn: { type: SchemaTypes.Number, default: moment.now() },
  price: { type: SchemaTypes.Number, required: [true, 'the price is required'] },
  checkOut: { type: SchemaTypes.Number, required: [true, 'the checkOut is required'] },
  numberRoom: { type: SchemaTypes.Number, unique: true, required: [true, 'room number is required'] },

  roomId: { type: SchemaTypes.ObjectId, ref: 'Room', required: true },
  staffId: { type: SchemaTypes.ObjectId, ref: 'Staff', required: true },
});

registerSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { registerId: _id, ...data };
};

export default model('Register', registerSchema);
