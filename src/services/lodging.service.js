import { response, request } from 'express';

import { existItems } from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

const getAll = async (req = request, res = response) => {
  try {
    //

    const { limit, offset } = req.query;

    const { msg, statusCode, data, ok } = await Controller.Logging.getAll(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.LoggingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Logging.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.LoggingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    //

    const { loggingId } = req.params;

    const { msg, statusCode, data, ok } = await Controller.Logging.getById(loggingId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.LoggingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Logging.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.LoggingService', error: error.toString() });
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

    // console.log(createResult);

    res.status(STATUS.success).json({ data: createResult, total: createResult.length });

    //
  } catch (error) {
    console.log({ step: 'error create.LoggingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (fiels) => {
  try {
    //

    const { msg, statusCode, data, ok } = await Controller.Logging.create(fiels);
    return { msg, statusCode, data, ok };

    //
  } catch (error) {
    console.log({ step: 'error create.LoggingService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

// const update = async (req = request, res = response) => {
//   try {
//     //

//     const { loggingId } = req.params;
//     const fiels = req.body;
//     const { staffId, registerId } = fiels;

//     const exist = await existItems({ staffId, registerId });
//     if (!exist) return res.json({ ok: false, data: [], msg: MESSAGE.paramsError });

//     const { msg, statusCode, data, ok } = await Controller.Logging.update({ ...fiels, loggingId });
//     res.status(statusCode).json({ data, msg, ok });

//     //
//   } catch (error) {
//     console.log({ step: 'error updete.LoggingService', error: error.toString() });
//     res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
//   }
// };

// const del = async (req = request, res = response) => {
//   try {
//     //

//     const { loggingId } = req.params;

//     const { msg, statusCode, data, ok } = await Controller.Logging.del(loggingId);
//     res.status(statusCode).json({ data, msg, ok });

//     //
//   } catch (error) {
//     console.log({ step: 'error delete.LoggingService', error: error.toString() });
//     res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
//   }
// };

// export default { getAll, getWhere, getById, getOne, create, update, del };
export default { createByRegistersId, getAll, getById, getOne, getWhere };
