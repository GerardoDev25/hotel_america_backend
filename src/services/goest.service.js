import { response, request } from 'express';

import helpers from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';
import Service from '.';

/**
 * @module Goest/service
 */

/**
 * getAll service function get all items
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getAll = async (req = request, res = response) => {
  try {
    //

    const { where } = req.body;

    const query = req.query;

    const limit = Number(query.limit);
    const offset = Number(query.offset);

    const { msg, statusCode, data, ok } = await Controller.Goest.getAll({ limit, offset, where });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.GoestService', error: error.toString() });
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

    const { msg, statusCode, data, ok } = await Controller.Goest.getAll({ limit, offset, where });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.GoestService', error: error.toString() });
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

    const { goestId } = req.params;

    const { msg, statusCode, data, ok } = await Controller.Goest.getById(goestId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getOne service function get a items with params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Goest.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * create service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const create = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;
    const { registerId } = fiels;

    const exist = await helpers.existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Goest.create(fiels);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error create.GoestService', error: error.toString() });
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

    const { goestId } = req.params;
    const fiels = req.body;
    const { registerId } = fiels;

    const exist = await helpers.existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Goest.update({ ...fiels, goestId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.GoestService', error: error.toString() });
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

    const { goestId } = req.params;
    const params = { goestId };

    const cafe = await Service.Cafe.delteMany(params);
    const { msg, statusCode, data, ok } = await Controller.Goest.del(goestId);

    res.status(statusCode).json({ data: { cafe, goest: data }, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error delete.GoestService', error: error.toString() });
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
    const result = Controller.Cafe.deleteMany(params);
    return result;

    //
  } catch (error) {
    console.log({ step: 'error deleteMany.GoestService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.errorDelete };
  }
};

export default { getAll, getWhere, getById, getOne, create, update, del, deleteMany };
