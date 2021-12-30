import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    const [total, rows] = await Promise.all([
      Model.Register.countDocuments(where),
      Model.Register.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);
    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAll.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getById = async (registerId) => {
  try {
    const data = await Model.Register.findById(registerId);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error getById.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const create = async (fiels) => {
  try {
    const data = new Model.Register({ ...fiels });
    await data.save();

    return data
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error create.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const update = async (fiels) => {
  try {
    const { registerId, ...rest } = fiels;
    const data = await Model.Register.findByIdAndUpdate(registerId, rest);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error update.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const del = async (registerId) => {
  try {
    const data = await Model.Register.findOneAndDelete({ _id: registerId });

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error delete.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, create, update, del };
