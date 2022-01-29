import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    //

    const [total, rows] = await Promise.all([Model.Goest.countDocuments(where), Model.Goest.find(where).limit(Number(limit)).skip(Number(offset))]);

    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAll.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getById = async (goestId) => {
  try {
    //

    const user = await Model.Goest.findById(goestId);

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getById.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getOne = async (where = {}) => {
  try {
    //

    const user = await Model.Goest.findOne(where);

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getOne.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const create = async (fiels) => {
  try {
    //

    const user = new Model.Goest({ ...fiels });
    await user.save();

    return user
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [user] }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error create.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const update = async (fiels) => {
  try {
    //

    const { goestId, ...rest } = fiels;
    const user = await Model.Goest.findByIdAndUpdate(goestId, rest);

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error update.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const del = async (goestId) => {
  try {
    const user = await Model.Goest.findOneAndDelete({ _id: goestId });

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error delete.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, getOne, create, update, del };
