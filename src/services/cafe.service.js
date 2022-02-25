import moment from 'moment';
import { response, request } from 'express';

import { getAllGoestsItems } from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

const getAll = async (req = request, res = response) => {
  try {
    //
    const { limit, offset } = req.query;

    const { msg, statusCode, data, ok } = await Controller.Cafe.getAll(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getAllIds = async (registerId) => {
  try {
    const limit = 0;
    const offset = 0;
    const where = { registerId };
    const { ok, data } = await Controller.Cafe.getAll(limit, offset, where);
    if (!ok) return [];

    const { rows = [] } = data;
    const ids = rows.map((item) => item._id.toString());
    return ids;

    //
  } catch (error) {
    console.log({ step: 'error getAllIds.CafeService', error: error.toString() });
    return [];
  }
};

const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Cafe.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    //

    const { cafeId } = req.params;

    const { msg, statusCode, data, ok } = await Controller.Cafe.getById(cafeId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Cafe.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (fiels) => {
  try {
    //

    const { msg, data, ok } = await Controller.Cafe.create(fiels);
    return { data, msg, ok };

    //
  } catch (error) {
    console.log({ step: 'error create.CafeService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.paramsError };
  }
};

const update = async (req = request, res = response) => {
  try {
    //

    const { cafeId } = req.params;
    const fiels = req.body;
    const { goestId, registerId } = fiels;

    const exist = await existItems({ goestId, registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Cafe.update({ ...fiels, cafeId });

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.CafeService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const cafeCreateAll = async (_, res = response) => {
  try {
    //

    const goestItems = await getAllGoestsItems();
    const createFun = goestItems.map((fiels) => create(fiels));
    const createResult = await Promise.all([...createFun]);

    res.status(STATUS.success).json({ data: createResult, total: createResult.length, msg: MESSAGE.successCrete });

    //
  } catch (error) {
    console.log({ step: 'error cafeCreateAll.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.errorCreate, data: [], ok: false });
  }
};

const cafeDelByRegisterId = async (registerId) => {
  try {
    //

    const ids = await getAllIds(registerId);
    const itemsFuctions = ids.map((cafeId) => Controller.Cafe.del(cafeId));
    const itemsDelete = await Promise.all([...itemsFuctions]);

    return { ok: true, data: itemsDelete, msg: MESSAGE.successDelete };

    //
  } catch (error) {
    console.log({ step: 'error cafeDelByRegisterId.CafeService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.errorDelete };
  }
};

export default { getAll, getWhere, getById, getOne, update, cafeCreateAll, cafeDelByRegisterId };
