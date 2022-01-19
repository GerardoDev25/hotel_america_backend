import { response, request } from 'express';
import bcryptjs from 'bcryptjs';

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

    const { password } = fiels;
    const salt = bcryptjs.genSaltSync();
    const passEncrypt = bcryptjs.hashSync(password, salt);

    const { msg, statusCode, data, ok } = await Controller.Staff.create({ ...fiels, password: passEncrypt });

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

    let { password } = fiels;
    if (password) {
      // * encode the password
      const salt = bcryptjs.genSaltSync();
      password = bcryptjs.hashSync(password, salt);
    }

    const { msg, statusCode, data, ok } = await Controller.Staff.update({ ...fiels, staffId, password });

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
