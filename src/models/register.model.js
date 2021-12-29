import { Schema, model, SchemaTypes } from 'mongoose';

const registerSchema = Schema({
  price: { type: Number, required: [true, 'the price is required'] },
  numberRoom: { type: Number, required: [true, 'the room number is required'] },
  discount: { type: Number },
  checkIn: { type: SchemaTypes.Date, required: [true, 'the check in is required'] },
  checkOut: { type: SchemaTypes.Date },
  roomId: {
    type: SchemaTypes.ObjectId,
    ref: 'Room',
    required: true,
  },
  staffId: {
    type: SchemaTypes.ObjectId,
    ref: 'Staff',
    required: true,
  },
});

registerSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { registerId: _id, ...data };
};

export default model('Register', registerSchema);
