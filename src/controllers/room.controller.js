import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    const [total, rows] = await Promise.all([
      Model.Room.countDocuments(where),
      Model.Room.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);
    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAllRoomsController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const getById = async (roomId) => {
  try {
    const data = await Model.Room.findById(roomId);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error getByIdRoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const create = async (fiels) => {
  try {
    const data = new Model.Room({ ...fiels });
    await data.save();

    return data
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error createRoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const update = async (fiels) => {
  try {
    const { roomId, ...rest } = fiels;
    const data = await Model.Room.findByIdAndUpdate(roomId, rest);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorUpdate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error updateRoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const del = async (roomId) => {
  try {
    const data = await Model.Room.findOneAndDelete({ roomId });

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorDelete, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error deleteRoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export default { getAll, getById, create, update, del };
