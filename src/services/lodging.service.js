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

const getAllIds = async (registerId) => {
  try {
    const limit = 0;
    const offset = 0;
    const where = { registerId };
    const { ok, data } = await Controller.Lodging.getAll(limit, offset, where);
    if (!ok) return [];

    const { rows = [] } = data;
    const ids = rows.map((item) => item._id.toString());
    return ids;
    //
  } catch (error) {
    console.log({ step: 'error getAllIds.LodgingService', error: error.toString() });
    return [];
  }
};

const getAllRegistersItems = async () => {
  try {
    const limit = 0;
    const { ok, data } = await Controller.Register.getAll(limit);
    if (!ok) return [];

    const { rows = [] } = data;
    const items = rows.map((item) => ({ registerId: item.data[0]._id.toString(), amount: item.data[0].price }));

    return items;

    //
  } catch (error) {
    console.log({ step: 'error getAllRegistersItems.LodgingService', error: error.toString() });
    return [];
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

const lodgingCreateAll = async (req = request, res = response) => {
  try {
    const registerItems = await getAllRegistersItems();
    const createFun = registerItems.map((fiels) => create(fiels));
    const createResult = await Promise.all([...createFun]);

    res.status(STATUS.success).json({ data: createResult, total: createResult.length, msg: MESSAGE.successCrete });

    //
  } catch (error) {
    console.log({ step: 'error lodgingCreateAll.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.errorCreate, data: [], ok: false });
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

const lodgingDelByRegisterId = async (registerId) => {
  try {
    //

    const ids = await getAllIds(registerId);
    const itemsFuctions = ids.map((lodgingId) => Controller.Lodging.del(lodgingId));
    const itemsDelete = await Promise.all([...itemsFuctions]);

    return { ok: true, data: itemsDelete, msg: MESSAGE.successDelete };

    //
  } catch (error) {
    console.log({ step: 'error lodgingDelByRegisterId.AmountService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.errorDelete };
  }
};

export default { getAll, getById, getOne, getWhere, update, lodgingDelByRegisterId, lodgingCreateAll };
