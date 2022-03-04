import { response, request } from 'express';

import helpers from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

const getAll = async (req = request, res = response) => {
  try {
    //

    const { limit, offset } = req.query;

    const { msg, statusCode, data, ok } = await Controller.Amount.getAll(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Amount.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getById = async (req = request, res = response) => {
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

const getOne = async (req = request, res = response) => {
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

const create = async (req = request, res = response) => {
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

const update = async (req = request, res = response) => {
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

const del = async (req = request, res = response) => {
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
