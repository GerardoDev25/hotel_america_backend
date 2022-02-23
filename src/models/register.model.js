import { Schema, model, SchemaTypes } from 'mongoose';
import moment from 'moment';

import 'moment/locale/es-mx';
moment.locale('es-mx');

const registerSchema = Schema({
  checkOut: { type: SchemaTypes.Number },
  discount: { type: SchemaTypes.Number, default: 0 },
  numGoest: { type: SchemaTypes.Number, default: 1 },
  checkIn: { type: SchemaTypes.Number, default: moment().format('L') },
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
