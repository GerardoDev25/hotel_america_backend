import { response, request } from 'express';

import Controller from '../controllers';
import { MESSAGE, STATUS } from '../settings';

const getAll = async (req = request, res = response) => {
  try {
    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await Controller.Staff.getAll(limit, offset);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getStaffAllService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    const { staffId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Staff.getById(staffId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getStaffByIdService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (req = request, res = response) => {
  try {
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Staff.create(fiels);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error createStaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    const { staffId } = req.params;
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Staff.update({ ...fiels, staffId });

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updeteStaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const del = async (req = request, res = response) => {
  try {
    const { staffId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Staff.del(staffId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error deleteStaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

export default { getAll, getById, create, update, del };
