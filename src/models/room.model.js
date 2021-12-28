import { Schema, model } from 'mongoose';

const roomSchema = Schema({
  doubleBed: { type: Number, required: [true, 'number of double bed is required'] },
  singleBed: { type: Number, required: [true, 'number of single bed is required'] },
  maxGuest: { type: Number, required: [true, 'number of max guest is required'] },
  numberRoom: { type: Number, required: [true, 'room number is required'] },
  available: { type: Boolean, required: true },
});

roomSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { roomId: _id, ...data };
};

export default model('Room', roomSchema);
