import { response, request } from 'express';

import CONTROLLER from '../controllers';
import { MESSAGE, STATUS } from '../settings';

export const getUser = async (req = request, res = response) => {
  try {
    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await CONTROLLER.getUser(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({
      step: 'error getUserService',
      error: error.toString(),
    });

    res.status(STATUS.conflict).json({
      msg: MESSAGE.conflict,
      ok: false,
    });
  }
};

export const postUser = async (req = request, res = response) => {
  try {
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await CONTROLLER.postUser(fiels);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({
      step: 'error postUserService',
      error: error.toString(),
    });

    res.status(STATUS.conflict).json({
      msg: MESSAGE.conflict,
      ok: false,
    });
  }
};

export const putUser = async (req = request, res = response) => {
  try {
    const { _id } = req.params;
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await CONTROLLER.putUser({ ...fiels, _id });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({
      step: 'error putUserService',
      error: error.toString(),
    });

    res.status(STATUS.conflict).json({
      msg: MESSAGE.conflict,
      ok: false,
    });
  }
};

export const deleteUser = async (req = request, res = response) => {
  try {
    const { _id } = req.params;
    const { msg, statusCode, data, ok } = await CONTROLLER.deleteUser(_id);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({
      step: 'error deleteUserService',
      error: error.toString(),
    });

    res.status(STATUS.conflict).json({
      msg: MESSAGE.conflict,
      ok: false,
    });
  }
};
