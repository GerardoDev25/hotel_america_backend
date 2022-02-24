import Model from '../models';
import { MESSAGE, STATUS } from '../helpers/settings';

const getAll = async (limit = 10, offset = 0, where = {}) => {
  try {
    //

    const [total, rows] = await Promise.all([Model.Staff.countDocuments(where), Model.Staff.find(where).limit(Number(limit)).skip(Number(offset))]);
    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAll.StaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getById = async (staffId) => {
  try {
    //

    const result = await Model.Staff.findById(staffId);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getById.StaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const getOne = async (where = {}) => {
  try {
    //

    const result = await Model.Staff.findOne(where);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getOne.StaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const create = async (fiels) => {
  try {
    //

    const result = new Model.Staff({ ...fiels });
    await result.save();

    return result
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [result] }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error create.StaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const update = async (fiels) => {
  try {
    //

    const { staffId, ...rest } = fiels;
    const result = await Model.Staff.findByIdAndUpdate(staffId, rest);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error update.StaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

const del = async (staffId) => {
  try {
    //

    const result = await Model.Staff.findOneAndDelete({ _id: staffId });

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error delete.StaffController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, getOne, create, update, del };
