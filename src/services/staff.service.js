import bcryptjs from 'bcryptjs';
import { response, request } from 'express';

import Controller from '../controllers';
import { STATUS } from '../helpers/settings';

/**
 * @module Staff/service
 */

/**
 * getAll service function get all items
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getAll = async (req = request, res = response) => {
  try {
    //

    const query = req.query;

    const limit = Number(query.limit);
    const offset = Number(query.offset);

    const { msg, statusCode, data, ok } = await Controller.Staff.getAll({ limit, offset });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getWhere service function get all items with some params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Goest.getAll({ limit, offset, where });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getById service function get a items with a id
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getById = async (req = request, res = response) => {
  try {
    //

    const { staffId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Staff.getById(staffId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getOne service function get a items with params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
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
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * create service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
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
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * update service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
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
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * del service function delte a item
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const del = async (req = request, res = response) => {
  try {
    //

    const { staffId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Staff.del(staffId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error delete.StaffService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

export default { getAll, getWhere, getById, getOne, create, update, del };
