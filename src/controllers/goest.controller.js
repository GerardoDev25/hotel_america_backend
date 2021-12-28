import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

export const getGoests = async (limit = 10, offset = 0, params) => {
  try {
    const [total, goests] = await Promise.all([
      Model.Goest.countDocuments(params),
      Model.Goest.find(params).limit(Number(limit)).skip(Number(offset)),
    ]);

    const data = {
      goests,
      total,
      pageCount: Math.ceil(total / limit),
    };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({
      step: 'error getGoestsController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const getGoest = async (goestId) => {
  try {
    const goest = await Model.Goest.findById(goestId);

    return goest
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [goest] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({
      step: 'error getGoestController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const postGoest = async (fiels) => {
  try {
    const goest = new Model.Goest({ ...fiels });
    await goest.save();

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: goest };

    //
  } catch (error) {
    console.log({
      step: 'error postGoestController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const putGoest = async (fiels) => {
  try {
    const { GoestId, ...rest } = fiels;
    const Goest = await Model.Goest.findByIdAndUpdate(GoestId, rest);
    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: Goest };

    //
  } catch (error) {
    console.log({
      step: 'error putGoestController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const deleteGoest = async (goestId) => {
  try {
    const goest = await Model.Goest.findOneAndDelete({ goestId });
    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: goest };

    //
  } catch (error) {
    console.log({
      step: 'error deleteGoestController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};
