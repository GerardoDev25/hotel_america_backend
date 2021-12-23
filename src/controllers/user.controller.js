import 'colors';

import MODEL from '../models';
import { MESSAGE, STATUS } from '../settings';

export const getUser = async (limit = 10, offset = 0) => {
  try {
    const [total, users] = await Promise.all([
      MODEL.user.countDocuments({ state: true }),
      MODEL.user.find({ state: true }).limit(Number(limit)).skip(Number(offset)),
    ]);

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: { total, users } };
  } catch (error) {
    console.log({
      step: 'error getUserController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};
