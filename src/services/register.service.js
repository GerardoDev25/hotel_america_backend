import { response, request } from 'express';

import Controller from '../controllers';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (req = request, res = response) => {
  try {
    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await Controller.Register.getAll(limit, offset);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getRegisterAllService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    const { registerId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Register.getById(registerId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getRegisterByIdService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (req = request, res = response) => {
  try {
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Register.create(fiels);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error createRegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    const { registerId } = req.params;
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Register.update({ ...fiels, registerId });

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updeteRegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const del = async (req = request, res = response) => {
  try {
    const { registerId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Register.del(registerId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error deleteRegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

export default { getAll, getById, create, update, del };
