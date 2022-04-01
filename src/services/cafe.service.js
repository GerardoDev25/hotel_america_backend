import { response, request } from 'express';

import { getFullDate, MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

/**
 * @module Cafe/service
 */

/**
 * getAll service function get all items
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getAll = async (req, res) => {
  try {
    //

    const query = req.query;

    const limit = Number(query.limit);
    const offset = Number(query.offset);

    const { msg, statusCode, data, ok } = await Controller.Cafe.getAll({ limit, offset });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getWhere service function get all items with some params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getWhere = async (req, res) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Cafe.getAll({ limit, offset, where });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getAllGoestsItems function get all goest item
 * @returns {Promise<Array>}
 */
const getAllGoestsItems = async () => {
  try {
    //

    const limit = 0;
    const now = getFullDate();
    const { ok, data } = await Controller.Goest.getAll({ limit });

    if (!ok) return [];
    const { rows = [] } = data;

    const itemsFilter = rows.filter((item) => item.date !== now);
    const items = itemsFilter.map((item) => ({
      goestId: item._id.toString(),
      registerId: item.registerId.toString(),
      name: item.name + ' ' + item.lastName,
      numberRoom: item.numberRoom,
    }));

    return items;

    //
  } catch (error) {
    console.log({ step: 'error getAllGoestsItems.CafeService', error: error.toString() });
    return [];
  }
};

/**
 *
 * @param {object} fiels object with the fiesl to create a new item
 * @returns {Promise<object>} return a primise with the item created
 */
const create = async (fiels) => {
  try {
    //

    const { data } = await Controller.Cafe.create(fiels);
    return data[0];

    //
  } catch (error) {
    console.log({ step: 'error create.CafeService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.paramsError, error: error.toString() };
  }
};

/**
 * cafeCreateAll create a item type cafe with all item of goest
 * @param {any} _
 * @param {response} res response with the result
 */
const cafeCreateAll = async (_, res) => {
  try {
    //

    const limit = 0;
    const offset = 0;
    const where = { date: getFullDate() };

    const { msg, statusCode, data, ok } = await Controller.Cafe.getAll({ limit, offset, where });
    if (data.total > 0) return res.status(statusCode).json({ ok, msg, data });

    const goestItems = await getAllGoestsItems();
    const createFun = goestItems.map((fiels) => create(fiels));
    const rows = await Promise.all([...createFun]);

    res.status(STATUS.success).json({ data: { rows, total: rows.length }, ok: true, msg: MESSAGE.successCrete });

    //
  } catch (error) {
    console.log({ step: 'error cafeCreateAll.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * update service function handle update a item
 * @param {request} req
 * @param {response} res
 */
const update = async (req, res) => {
  try {
    //

    const { cafeId } = req.params;
    const fiels = req.body;

    const { msg, statusCode, data, ok } = await Controller.Cafe.update({ ...fiels, cafeId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * deleteMany service function handle delete all item that make 
 * match with the params
 * @param {object} params
 * @returns {Promise<object>}
 */
const delteMany = async (params) => {
  try {
    //
    const result = await Controller.Cafe.deleteMany(params);
    return result;
    //
  } catch (error) {
    console.log({ step: 'error cafeCreateAll.CafeService', error: error.toString() });
    return { msg: MESSAGE.errorCreate, data: [], ok: false, error: error.toString() };
  }
};

export default { getAll, getWhere, cafeCreateAll, update, delteMany };
