import { response, request } from 'express';

import helpers from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';
import Service from '.';

const getAll = async (req = request, res = response) => {
  try {
    //

    const { where } = req.body;
    const { limit, offset } = req.query;

    const { msg, statusCode, data, ok } = await Controller.Goest.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Goest.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    //

    const { goestId } = req.params;

    const { msg, statusCode, data, ok } = await Controller.Goest.getById(goestId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Goest.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;
    const { registerId } = fiels;

    const exist = await helpers.existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Goest.create(fiels);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error create.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    //

    const { goestId } = req.params;
    const fiels = req.body;
    const { registerId } = fiels;

    const exist = await helpers.existItems({ registerId });
    if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

    const { msg, statusCode, data, ok } = await Controller.Goest.update({ ...fiels, goestId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const del = async (req = request, res = response) => {
  try {
    //

    const { goestId } = req.params;
    const params = { goestId };

    const cafe = await Service.Cafe.delteMany(params);
    const { msg, statusCode, data, ok } = await Controller.Goest.del(goestId);

    res.status(statusCode).json({ data: { cafe, goest: data }, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error delete.GoestService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const deleteMany = async (params) => {
  try {
    //
    const result = Controller.Cafe.deleteMany(params);
    return result;

    //
  } catch (error) {
    console.log({ step: 'error goestDelByRegisterId.GoestService', error: error.toString() });
    return { ok: false, data: [], msg: MESSAGE.errorDelete };
  }
};

export default { getAll, getWhere, getById, getOne, create, update, del, deleteMany };

// const getCafeAllIds = async (goestId) => {
//   try {
//     //

//     const limit = 0;
//     const offset = 0;
//     const where = { goestId };
//     const { ok, data } = await Controller.Cafe.getAll(limit, offset, where);
//     if (!ok) return [];

//     const { rows = [] } = data;
//     const ids = rows.map((item) => item._id.toString());
//     return ids;

//     //
//   } catch (error) {
//     console.log({ step: 'error getCafeAllIds.GoestService', error: error.toString() });
//     return [];
//   }
// };

// const getAllIds = async (registerId) => {
//   try {
//     //

//     const limit = 0;
//     const offset = 0;
//     const where = { registerId };
//     const { ok, data } = await Controller.Goest.getAll(limit, offset, where);
//     if (!ok) return [];

//     const { rows = [] } = data;
//     const ids = rows.map((item) => item._id.toString());
//     return ids;

//     //
//   } catch (error) {
//     console.log({ step: 'error getAllIds.GoestService', error: error.toString() });
//     return [];
//   }
// };

// const goestDelByRegisterId = async (registerId) => {
//   try {
//     //

//     const ids = await getAllIds(registerId);
//     const itemsFuctions = ids.map((goestId) => Controller.Goest.del(goestId));
//     const itemsDelete = await Promise.all([...itemsFuctions]);

//     return { ok: true, data: itemsDelete, msg: MESSAGE.successDelete };

//     //
//   } catch (error) {
//     console.log({ step: 'error goestDelByRegisterId.GoestService', error: error.toString() });
//     return { ok: false, data: [], msg: MESSAGE.errorDelete };
//   }
// };

// export default { getAll, getWhere, getById, getOne, create, update, del, goestDelByRegisterId, deleteMany };
