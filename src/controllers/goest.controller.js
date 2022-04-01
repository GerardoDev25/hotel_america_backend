import '../jsdocTypes/types';
import Model from '../models';
import { MESSAGE, STATUS } from '../helpers/settings';

/**
 * @module Goest/controller
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
      Model.Goest.countDocuments(where),
      Model.Goest.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);

    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAll.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

/**
 * getById controller function get a item with a id
 * @param {string} goestId goest's id
 * @returns {Promise<Data>} return a promise with the values
 */
const getById = async (goestId) => {
  try {
    //

    const result = await Model.Goest.findById(goestId);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getById.GoestController', error: error.toString() });
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

    const result = await Model.Goest.findOne(where);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getOne.GoestController', error: error.toString() });
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

    const result = new Model.Goest({ ...fiels });
    await result.save();

    return result
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [result] }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error create.GoestController', error: error.toString() });
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

    const { goestId, ...rest } = fiels;
    const result = await Model.Goest.findByIdAndUpdate(goestId, rest);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error update.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

/**
 * del controller function delete a item with a id
 * @param {string} goestId goest's id
 * @returns {Promise<Data>} return a promise with the result
 */
const del = async (goestId) => {
  try {
    //

    const result = await Model.Goest.findOneAndDelete({ _id: goestId });

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error delete.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

/**
 * deleteMany controller delete many items
 * @param {object} params object with all params to delete many items
 * @returns {Promise<Data>} return a promise with the result
 */
const deleteMany = async (params) => {
  try {
    //

    const result = await Model.Goest.deleteMany({ ...params });

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error deleteMany.GoestController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, getOne, create, update, del, deleteMany };
