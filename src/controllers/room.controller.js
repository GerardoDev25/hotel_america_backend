import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (limit = 10, offset = 0, where) => {
  try {
    const [total, rooms] = await Promise.all([
      Model.Room.countDocuments(where),
      Model.Room.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);

    const data = {
      rooms,
      total,
      pageCount: Math.ceil(total / limit),
    };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({
      step: 'error getAllRoomsController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const getById = async (roomId) => {
  try {
    const room = await Model.Room.findById(roomId);

    return room
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [room] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({
      step: 'error getByIdRoomController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const create = async (fiels) => {
  try {
    const room = new Model.Room({ ...fiels });
    await room.save();

    return room
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [room] }
      : { statusCode: STATUS.expectationFailed, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({
      step: 'error createRoomController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const update = async (fiels) => {
  try {
    console.log(fiels);
    const { roomId, ...rest } = fiels;
    const room = await Model.Room.findByIdAndUpdate(roomId, rest);

    return room
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [room] }
      : { statusCode: STATUS.expectationFailed, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({
      step: 'error updateRoomController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const del = async (roomId) => {
  try {
    const room = await Model.Room.findOneAndDelete({ roomId });

    return room
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [room] }
      : { statusCode: STATUS.expectationFailed, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({
      step: 'error deleteRoomController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export default { getAll, getById, create, update, del };
