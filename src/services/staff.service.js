import bcryptjs from 'bcryptjs';
import { response, request } from 'express';

import Controller from '../controllers';
import { MESSAGE, STATUS } from '../helpers/settings';

const getAll = async (req = request, res = response) => {
  try {
    //

    const { limit, offset } = req.query;

    const { msg, statusCode, data, ok } = await Controller.Staff.getAll(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.StaffService', error: error.toString() });
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
    console.log({ step: 'error getWhere.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getById = async (req = request, res = response) => {
  try {
    //

    const { staffId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Staff.getById(staffId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Staff.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const create = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;

    // * business logic
    const { password } = fiels;
    const salt = bcryptjs.genSaltSync();
    const passEncrypt = bcryptjs.hashSync(password, salt);

    const { msg, statusCode, data, ok } = await Controller.Staff.create({ ...fiels, password: passEncrypt });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error create.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const update = async (req = request, res = response) => {
  try {
    //

    const { staffId } = req.params;
    const fiels = req.body;

    let { password } = fiels;
    if (password) {
      const salt = bcryptjs.genSaltSync();
      password = bcryptjs.hashSync(password, salt);
    }

    const { msg, statusCode, data, ok } = await Controller.Staff.update({ ...fiels, staffId, password });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

const del = async (req = request, res = response) => {
  try {
    //

    const { staffId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Staff.del(staffId);

    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error delete.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

export default { getAll, getWhere, getById, getOne, create, update, del };
