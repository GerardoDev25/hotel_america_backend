import Model from '../models';
import { MESSAGE, STATUS } from '../helpers/settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    //

    const [total, rows] = await Promise.all([Model.Room.countDocuments(where), Model.Room.find(where).limit(Number(limit)).skip(Number(offset))]);
    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAll.RoomsController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getById = async (roomId) => {
  try {
    //

    const user = await Model.Room.findById(roomId);

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getById.RoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getOne = async (where = {}) => {
  try {
    //

    const user = await Model.Room.find(where);

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getOne.RoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const create = async (fiels) => {
  try {
    //

    const user = new Model.Room({ ...fiels });
    await user.save();

    return user
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [user] }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error create.RoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const update = async (fiels) => {
  try {
    //

    const { roomId, ...rest } = fiels;
    const user = await Model.Room.findByIdAndUpdate(roomId, rest);

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error update.RoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const del = async (roomId) => {
  try {
    const user = await Model.Room.findOneAndDelete({ _id: roomId });
    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error delete.RoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, getOne, create, update, del };
