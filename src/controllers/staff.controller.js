import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    const [total, rows] = await Promise.all([
      Model.Staff.countDocuments(where),
      Model.Staff.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);
    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAllStaffsController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getById = async (staffId) => {
  try {
    const data = await Model.Staff.findById(staffId);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error getByIdStaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const create = async (fiels) => {
  try {
    const data = new Model.Staff({ ...fiels });
    await data.save();

    return data
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error createStaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const update = async (fiels) => {
  try {
    const { staffId, ...rest } = fiels;
    const data = await Model.Staff.findByIdAndUpdate(staffId, rest);

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error updateStaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const del = async (staffId) => {
  try {
    const data = await Model.Staff.findOneAndDelete({ _id: staffId });

    return data
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: {} };

    //
  } catch (error) {
    console.log({ step: 'error deleteStaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, create, update, del };
