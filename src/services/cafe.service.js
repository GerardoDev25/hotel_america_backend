import moment from 'moment';
import { response, request } from 'express';

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
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
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
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getAllGoestsItems = async () => {
  try {
    //

    const limit = 0;
    const now = moment().format('L');
    const { ok, data } = await Controller.Goest.getAll(limit);

    if (!ok) return [];
    const { rows = [] } = data;

    const itemsFilter = rows.filter((item) => item.date !== now);
    const items = itemsFilter.map((item) => ({
      goestId: item._id.toString(),
      registerId: item.registerId.toString(),
      name: item.name + ' ' + item.lastName,
      numberRoom: item.numberRoom,
    }));

    return items;

    //
  } catch (error) {
    console.log({ step: 'error getAllGoestsItems.CafeService', error: error.toString() });
    return [];
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
    return { ok: false, data: [], msg: MESSAGE.paramsError, error: error.toString() };
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
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const delteMany = async (params) => {
  try {
    //
    const result = await Controller.Cafe.deleteMany(params);
    return result;
    //
  } catch (error) {
    console.log({ step: 'error cafeCreateAll.LodgingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.errorCreate, data: [], ok: false, error: error.toString() });
  }
};

export default { getAll, getWhere, cafeCreateAll, delteMany };
