import { response, request } from 'express';

import helpers from '../helpers';
import { getFullDate, MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

/**
 * @module Lodging/service
 */

/**
 * getAll service function get all items
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getAll = async (req = request, res = response) => {
  try {
    //

    const query = req.query;

    const limit = Number(query.limit);
    const offset = Number(query.offset);

    const { msg, statusCode, data, ok } = await Controller.Lodging.getAll({ limit, offset });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getById service function get a items with a id
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getById = async (req = request, res = response) => {
  try {
    //

    const { lodgingId } = req.params;

    const { msg, statusCode, data, ok } = await Controller.Lodging.getById(lodgingId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getWhere service function get all items with some params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Lodging.getAll({ limit, offset, where });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getAllRegistersItems service function return a promise with all
 * register item
 * @returns {Promise<Array>}
 */
const getAllRegistersItems = async () => {
  try {
    //

    const limit = 0;
    const { ok, data } = await Controller.Register.getAll({ limit });
    if (!ok) return [];

    const { rows = [] } = data;
    const items = rows.map((item) => ({ registerId: item._id.toString(), amount: item.price }));

    return items;

    //
  } catch (error) {
    console.log({ step: 'error getAllRegistersItems.helpers', error: error.toString() });
    return [];
  }
};

/**
 * create service function handle create a new item
 * @param {object} fiels object with all fiels for create a new item
 * @returns {Promise<object>} return a promise with the new item create
 */
const create = async (fiels) => {
  try {
    //

    const { msg, statusCode, data, ok } = await Controller.Lodging.create(fiels);
    return { msg, statusCode, data, ok };

    //
  } catch (error) {
    console.log({ step: 'error create.LodgingService', error: error.toString() });
    return { msg: error.toString(), ok: false, data: [] };
  }
};

/**
 * existItem service function verify if exist a itemms with the current data
 * @returns {Promise<boolean>} return a promise with the result
 */
const exitItems = async () => {
  try {
    //

    const limit = 0;
    const offset = 0;
    const where = { date: getFullDate() };

    const { data, ok } = await Controller.Lodging.getAll({ limit, offset, where });
    if (ok && data.total === 0) return true;
    return false;

    //
  } catch (error) {
    console.log({ step: 'error create.LodgingService', error: error.toString() });
    return false;
  }
};

/**
 * lodgingCreateAll service function create many items with all register items
 * @param {any} _
 * @param {response} res
 */
const lodgingCreateAll = async (_, res = response) => {
  try {
    //

    const exist = await exitItems();
    if (!exist) return res.status(STATUS.success).json({ data: {}, total: 0, msg: MESSAGE.itemsExist });

    const registerItems = await getAllRegistersItems();
    const createFun = registerItems.map((fiels) => create(fiels));
    const createResult = await Promise.all([...createFun]);

    res.status(STATUS.success).json({ data: createResult, total: createResult.length, msg: MESSAGE.successCrete });

    //
  } catch (error) {
    console.log({ step: 'error lodgingCreateAll.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * update service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const update = async (req = request, res = response) => {
  try {
    //

    const { lodgingId } = req.params;
    const fiels = req.body;
    const { registerId } = fiels;

    const exist = await helpers.existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Lodging.update({ ...fiels, lodgingId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * del service function delte a item
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const del = async (req = request, res = response) => {
  try {
    //

    const { lodgingId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Lodging.del(lodgingId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error delete.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * deleteMany service function handle delete all item that make
 * match with the params
 * @param {object} params
 * @returns {Promise<object>}
 */
const deleteMany = async (params) => {
  try {
    //

    const result = await Controller.Lodging.deleteMany(params);
    return { ok: true, data: result, msg: MESSAGE.successDelete };

    //
  } catch (error) {
    console.log({ step: 'error deleteMany.LodgingService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.errorDelete };
  }
};

export default { getAll, getById, getWhere, update, lodgingCreateAll, deleteMany, del };
