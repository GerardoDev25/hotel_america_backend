import 'colors';
import { response, request } from 'express';
import Controller from '../controllers';
import { MESSAGE, STATUS } from '../settings';

export const getUser = async (req = request, res = response) => {
  try {
    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await Controller.getUser(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({
      step: 'error getUserService'.red,
      error: error.toString(),
    });

    res.status(STATUS.conflict).json({
      msg: MESSAGE.conflict,
      ok: false,
    });
  }
};
