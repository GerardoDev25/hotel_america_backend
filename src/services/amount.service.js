import { response, request } from 'express';

import helpers from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

/**
 * @module Amount/service
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

    const { msg, statusCode, data, ok } = await Controller.Amount.getAll({ limit, offset });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.AmountService', error: error.toString() });
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

    const { msg, statusCode, data, ok } = await Controller.Amount.getAll({ limit, offset, where });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getById service function get a items with a id
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getById = async (req, res) => {
  try {
    //

    const { amountId } = req.params;

    const { msg, statusCode, data, ok } = await Controller.Amount.getById(amountId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getOne service function get a items with params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getOne = async (req, res) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Amount.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * create service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const create = async (req, res) => {
  try {
    //

    const fiels = req.body;
    const { staffId, registerId } = fiels;

    const exist = await helpers.existItems({ staffId, registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Amount.create(fiels);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error create.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * update service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const update = async (req, res) => {
  try {
    //

    const { amountId } = req.params;
    const fiels = req.body;
    const { staffId, registerId } = fiels;

    const exist = await helpers.existItems({ staffId, registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Amount.update({ ...fiels, amountId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * del service function delte a item
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const del = async (req, res) => {
  try {
    //

    const { amountId } = req.params;

    const { msg, statusCode, data, ok } = await Controller.Amount.del(amountId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error delete.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

export default { getAll, getWhere, getById, getOne, create, update, del };
