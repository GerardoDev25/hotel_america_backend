import { Schema, model, SchemaTypes } from 'mongoose';
import { KIND_OF_ROOM } from '../settings';


const roomSchema = Schema({
  available: { type: SchemaTypes.Boolean, required: true },
  maxGuest: { type: SchemaTypes.Number, required: [true, 'number of max guest is required'] },
  doubleBed: { type: SchemaTypes.Number, required: [true, 'number of double bed is required'] },
  singleBed: { type: SchemaTypes.Number, required: [true, 'number of single bed is required'] },

  kindOfRoom: { type: SchemaTypes.String, required: true, enum: KIND_OF_ROOM },
  numberRoom: { type: SchemaTypes.Number, unique: true, required: [true, 'room number is required'] },
});

roomSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { roomId: _id, ...data };
};

export default model('Room', roomSchema);
