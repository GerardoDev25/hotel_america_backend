import { response, request } from 'express';

import Controller from '../controllers';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (req = request, res = response) => {
  try {
    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await Controller.Goest.getAll(limit, offset);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getGoestAllService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    const { goestId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Goest.getById(goestId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getGoestByIdService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (req = request, res = response) => {
  try {
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Goest.create(fiels);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error createGoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    const { goestId } = req.params;
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Goest.update({ ...fiels, goestId });

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updeteGoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const del = async (req = request, res = response) => {
  try {
    const { goestId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Goest.del(goestId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error deleteGoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

export default { getAll, getById, create, update, del };
