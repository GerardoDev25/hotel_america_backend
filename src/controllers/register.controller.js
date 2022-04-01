import Model from '../models';
import { MESSAGE, STATUS } from '../helpers/settings';

/**
 * @module Register/controller
 */

/**
 * getAll controller function get all items
 * @param {getAllParams} params params for get the items
 * @returns {Promise<Data>} return a prmise with the values
 */
const getAll = async ({ limit = 10, offset = 0, where = {} }) => {
  try {
    //

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

/**
 * getById controller function get a item with a id
 * @param {string} registerId register's id
 * @returns {Promise<Data>} return a promise with the values
 */
const getById = async (registerId) => {
  try {
    //

    const result = await Model.Register.findById(registerId);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getById.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

/**
 * getOne controller function get a item wtih params
 * @param {object} [where={}] object with all param to make match
 * @returns {Promise<Data>} return a promise with the result
 */
const getOne = async (where = {}) => {
  try {
    //

    const result = await Model.Register.find(where);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getOne.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

/**
 * create controller function
 * @param {object} fiels object with all fiels to create a new item
 * @returns {Promise<Data>} return a promise with the result
 */
const create = async (fiels) => {
  try {
    //

    const result = new Model.Register({ ...fiels });
    await result.save();

    return result
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [result] }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error create.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};


/**
 * update controller function
 * @param {object} fiels object with all fiels to update a new item
 * @returns {Promise<Data>} return a promise with the result
 */
const update = async (fiels) => {
  try {
    //

    const { registerId, ...rest } = fiels;
    const result = await Model.Register.findByIdAndUpdate(registerId, rest);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error update.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};


/**
 * del controller function delete a item with a id
 * @param {string} registerId register's id
 * @returns {Promise<Data>} return a promise with the result
 */
const del = async (registerId) => {
  try {
    //

    const result = await Model.Register.findOneAndDelete({ _id: registerId });

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error delete.RegisterController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, getOne, create, update, del };
