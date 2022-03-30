import { response, request } from 'express';

import helpers from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

const getAll = async (req = request, res = response) => {
  try {
    //


    const query = req.query;

    const limit = Number(query.limit);
    const offset = Number(query.offset);

    const { msg, statusCode, data, ok } = await Controller.Register.getAll(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.RegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit = 0, offset, ...where } = req.body;
    const { msg, statusCode, data, ok } = await Controller.Register.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.RegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getById = async (req = request, res = response) => {
  try {
    //

    const { registerId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Register.getById(registerId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.RegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };
    const { msg, statusCode, data, ok } = await Controller.Register.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.RegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const create = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;
    const { roomId, staffId } = fiels;

    const exist = await helpers.existItems({ staffId, roomId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Register.create(fiels);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error create.RegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const update = async (req = request, res = response) => {
  try {
    //

    const { registerId } = req.params;
    const fiels = req.body;
    const { roomId, staffId } = fiels;

    const exist = await helpers.existItems({ staffId, roomId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Register.update({ ...fiels, registerId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.RegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const del = async (req = request, res = response) => {
  try {
    //

    const { registerId } = req.params;

    const limit = 0;
    const offset = 0;
    const where = { registerId };
    const params = { registerId };

    const [goest, amount, lodging] = await Promise.all([
      Controller.Goest.getAll(limit, offset, where),
      Controller.Amount.getAll(limit, offset, where),
      Controller.Lodging.getAll(limit, offset, where),
    ]);

    const [_, goestDelete, amountDelete, lodgingDelete] = await Promise.all([
      Controller.Cafe.deleteMany(params),
      Controller.Goest.deleteMany(params),
      Controller.Amount.deleteMany(params),
      Controller.Lodging.deleteMany(params),
    ]);

    const { msg, statusCode, data, ok } = await Controller.Register.del(registerId);
    res.status(statusCode).json({
      data: {
        register: data[0],
        goest: { data: goest, delete: goestDelete },
        amount: { data: amount, delete: amountDelete },
        lodging: { data: lodging, delete: lodgingDelete },
      },
      msg,
      ok,
    });

    //
  } catch (error) {
    console.log({ step: 'error delete.RegisterService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

export default { getAll, getWhere, getById, getOne, create, update, del };
