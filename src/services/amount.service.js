import { response, request } from 'express';

import Controller from '../controllers';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (req = request, res = response) => {
  try {
    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await Controller.Amount.getAll(limit, offset);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAmountAllService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    const { amountId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Amount.getById(amountId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAmountByIdService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (req = request, res = response) => {
  try {
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Amount.create(fiels);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error createAmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    const { amountId } = req.params;
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Amount.update({ ...fiels, amountId });

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updeteAmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const del = async (req = request, res = response) => {
  try {
    const { amountId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Amount.del(amountId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error deleteAmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

export default { getAll, getById, create, update, del };
