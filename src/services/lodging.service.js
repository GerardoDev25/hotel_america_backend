import moment from 'moment';
import { response, request } from 'express';

import helpers from '../helpers';
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

const getAllRegistersItems = async () => {
  try {
    //

    const limit = 0;
    const { ok, data } = await Controller.Register.getAll(limit);
    if (!ok) return [];

    const { rows = [] } = data;
    const items = rows.map((item) => ({ registerId: item._id.toString(), amount: item.price }));

    return items;

    //
  } catch (error) {
    console.log({ step: 'error getAllRegistersItems.helpers', error: error.toString() });
    return [];
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

const exitItems = async () => {
  try {
    //

    const limit = 0;
    const offset = 0;
    const where = { date: moment().format('L') };

    const { data, ok } = await Controller.Lodging.getAll(limit, offset, where);
    // console.log(data, ok);
    if (ok && data.total === 0) return true;
    return false;

    //
  } catch (error) {
    console.log({ step: 'error create.LodgingService', error: error.toString() });
    return false;
  }
};

const lodgingCreateAll = async (_, res = response) => {
  try {
    //

    const exist = await exitItems();
    if (!exist) return res.status(STATUS.success).json({ data: {}, total: 0, msg: MESSAGE.itemsExist });

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

const update = async (req = request, res = response) => {
  try {
    //

    const { lodgingId } = req.params;
    const fiels = req.body;
    const { registerId } = fiels;

    const exist = await helpers.existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Lodging.update({ ...fiels, lodgingId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const deleteMany = async (params) => {
  try {
    //

    const result = await Controller.Lodging.deleteMany(params);
    return { ok: true, data: result, msg: MESSAGE.successDelete };

    //
  } catch (error) {
    console.log({ step: 'error deleteMany.AmountService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.errorDelete };
  }
};

export default { getAll, getWhere, update, lodgingCreateAll, deleteMany };
