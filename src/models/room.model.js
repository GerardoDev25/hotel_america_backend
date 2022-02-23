import { Schema, model, SchemaTypes } from 'mongoose';
import { KIND_OF_ROOM } from '../helpers/settings';

const roomSchema = Schema({
  doubleBed: { type: SchemaTypes.Number, default: 0 },
  singleBed: { type: SchemaTypes.Number, default: 0 },
  available: { type: SchemaTypes.Boolean, default: true },
  kindOfRoom: { type: SchemaTypes.String, required: true, enum: KIND_OF_ROOM },
  maxGuest: { type: SchemaTypes.Number, required: [true, 'number of max guest is required'] },
  numberRoom: { type: SchemaTypes.Number, required: [true, 'room number is required'], unique: true },
});

roomSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return { roomId: _id, ...data };
};

export default model('Room', roomSchema);
