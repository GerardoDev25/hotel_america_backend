import moment from 'moment';
import { Schema, model, SchemaTypes } from 'mongoose';

const lodgingSchema = Schema({
  date: { type: SchemaTypes.String, default: moment().format('L') },
  amount: { type: SchemaTypes.Number, required: [true, 'amount is required'] },
  registerId: { type: SchemaTypes.ObjectId, ref: 'Register', required: [true, 'id register is required'] },
});

lodgingSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { lodgingId: _id, ...data };
};

export default model('Lodging', lodgingSchema);
