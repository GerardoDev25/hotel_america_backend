import Model from '../models';
import { MESSAGE, STATUS } from '../helpers/settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    //

    const [total, rows] = await Promise.all([
      Model.Lodging.countDocuments(where),
      Model.Lodging.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);

    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAll.LodgingController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const create = async (fiels) => {
  try {
    //

    const result = new Model.Lodging({ ...fiels });
    await result.save();

    return result
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [result] }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error create.LodgingController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const update = async (fiels) => {
  try {
    //

    const { lodgingId, ...rest } = fiels;
    const result = await Model.Lodging.findByIdAndUpdate(lodgingId, rest);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error update.LodgingController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const deleteMany = async (params) => {
  try {
    //

    const result = await Model.Lodging.deleteMany({ ...params });

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error delete.LodgingController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, create, update, deleteMany };
