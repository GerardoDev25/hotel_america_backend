import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    const [total, rows] = await Promise.all([
      Model.Goest.countDocuments(where),
      Model.Goest.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);
    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAllGoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const getById = async (goestId) => {
  try {
    const data = await Model.Goest.findById(goestId);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error getByIdGoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const create = async (fiels) => {
  try {
    const data = new Model.Goest({ ...fiels });
    await data.save();

    return data
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error createGoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const update = async (fiels) => {
  try {
    const { goestId, ...rest } = fiels;
    const data = await Model.Goest.findByIdAndUpdate(goestId, rest);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorUpdate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error updateGoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

const del = async (goestId) => {
  try {
    const data = await Model.Goest.findOneAndDelete({ goestId });

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorDelete, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error deleteGoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export default { getAll, getById, create, update, del };
