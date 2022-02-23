import { response, request } from 'express';

import { existItems } from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

const getAll = async (req = request, res = response) => {
  try {
    //

    const { limit, offset } = req.query;

    const { msg, statusCode, data, ok } = await Controller.Lodging.getAll(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Lodging.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    //

    const { lodgingId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Lodging.getById(lodgingId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Lodging.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const createByRegistersId = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;
    const { registerIds = [] } = fiels;

    const registerFun = registerIds.map((id) => Controller.Register.getById(id));
    const registerResult = await Promise.all([...registerFun]);

    const registerFound = registerResult.filter((item) => item.ok);
    const registerObject = registerFound.map((item) => ({ registerId: item.data[0]._id.toString(), amount: item.data[0].price }));

    const createFun = registerObject.map((fiels) => create(fiels));
    const createResult = await Promise.all([...createFun]);

    res.status(STATUS.success).json({ data: createResult, total: createResult.length });

    //
  } catch (error) {
    console.log({ step: 'error create.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (fiels) => {
  try {
    //

    const { msg, statusCode, data, ok } = await Controller.Lodging.create(fiels);
    return { msg, statusCode, data, ok };

    //
  } catch (error) {
    console.log({ step: 'error create.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    //

    const { lodgingId } = req.params;
    const fiels = req.body;
    const { registerId } = fiels;

    const exist = await existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Lodging.update({ ...fiels, lodgingId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const delByRegisterId = async (req = request, res = response) => {
  try {
    //

    const { registerId } = req.params;

    const exist = await existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const limit = 0;
    const offset = 0;
    const where = { registerId };

    const { msg, statusCode, data, ok } = await Controller.Lodging.getAll(limit, offset, where);
    if (!ok) res.status(statusCode).json({ data, msg, ok });

    const lodgingIds = data.rows.map((item) => ({ lodgingId: item._id.toString() }));
    const lodgingFun = lodgingIds.map((item) => Controller.Lodging.del(item.lodgingId));
    const lodgingResult = await Promise.all([...lodgingFun]);

    res.status(STATUS.success).json({ msg: MESSAGE.successDelete, data: lodgingResult, total: lodgingResult.length });

    //
  } catch (error) {
    console.log({ step: 'error delete.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

// const del = async (req = request, res = response) => {
//   try {
//     //

//     const { lodgingId } = req.params;

//     const { msg, statusCode, data, ok } = await Controller.Lodging.del(lodgingId);
//     res.status(statusCode).json({ data, msg, ok });

//     //
//   } catch (error) {
//     console.log({ step: 'error delete.LodgingService', error: error.toString() });
//     res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
//   }
// };

export default { createByRegistersId, getAll, getById, getOne, getWhere, update, delByRegisterId };
