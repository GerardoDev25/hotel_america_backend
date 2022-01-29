import { response, request } from 'express';

import Controller from '../controllers';
import Service from '.';

import { MESSAGE, STATUS } from '../settings';
import { existItems } from '../helpers';

const getAll = async (req = request, res = response) => {
  try {
    //

    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await Controller.Amount.getAll(limit, offset);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
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
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
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
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;

    const { staffId, registerId } = fiels;
    if (!existItems([staffId, registerId])) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    // todo create a funtion to verify if exist resuouces nencesaries
    // const [staff, register] = await Promise.all([Service.Staff.getById(staffId), Service.Register.getById(registerId)]);
    // if (!staff.ok || !register.ok) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Amount.create(fiels);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error create.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    //

    const { amountId } = req.params;
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Amount.update({ ...fiels, amountId });

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.AmountService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
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
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

export default { getAll, getById, getOne, create, update, del };
