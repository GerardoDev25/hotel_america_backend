import '../jsdocTypes/types';
import Model from '../models';
import { MESSAGE, STATUS } from '../helpers/settings';

/**
 * @module Room/controller
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
      Model.Room.countDocuments(where),
      Model.Room.find(where).limit(Number(limit)).skip(Number(offset)),
    ]);
    const data = { rows, total, pageCount: Math.ceil(total / limit) };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({ step: 'error getAll.RoomsController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

/**
 * getById controller function get a item with a id
 * @param {string} roomId room's id
 * @returns {Promise<Data>} return a promise with the values
 */
const getById = async (roomId) => {
  try {
    //

    const result = await Model.Room.findById(roomId);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getById.RoomController', error: error.toString() });
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

    const result = await Model.Room.find(where);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error getOne.RoomController', error: error.toString() });
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

    const result = new Model.Room({ ...fiels });
    await result.save();

    return result
      ? { statusCode: STATUS.created, msg: MESSAGE.successCrete, ok: true, data: [result] }
      : { statusCode: STATUS.internalServerError, msg: MESSAGE.errorCreate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error create.RoomController', error: error.toString() });
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

    const { roomId, ...rest } = fiels;
    const result = await Model.Room.findByIdAndUpdate(roomId, rest);

    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successUpdate, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorUpdate, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error update.RoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

/**
 * del controller function delete a item with a id
 * @param {string} roomId room's id
 * @returns {Promise<Data>} return a promise with the result
 */
const del = async (roomId) => {
  try {
    //

    const result = await Model.Room.findOneAndDelete({ _id: roomId });
    return result
      ? { statusCode: STATUS.success, msg: MESSAGE.successDelete, ok: true, data: [result] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.errorDelete, ok: false, data: [] };

    //
  } catch (error) {
    console.log({ step: 'error delete.RoomController', error: error.toString() });
    return { statusCode: STATUS.internalServerError, ok: false, msg: error.toString() };
  }
};

export default { getAll, getById, getOne, create, update, del };
