import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

export const getAmounts = async (limit = 10, offset = 0, params) => {
  try {
    const [total, amounts] = await Promise.all([
      Model.Amount.countDocuments(params),
      Model.Amount.find(params).limit(Number(limit)).skip(Number(offset)),
    ]);

    const data = {
      amounts,
      total,
      pageCount: Math.ceil(total / limit),
    };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({
      step: 'error getAmountsController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const getAmount = async (amountId) => {
  try {
    const amount = await Model.Amount.findById(amountId);

    return amount
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [amount] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

    //
  } catch (error) {
    console.log({
      step: 'error getAmountController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const postAmount = async (fiels) => {
  try {
    const amount = new Model.Amount({ ...fiels });
    await amount.save();

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: amount };

    //
  } catch (error) {
    console.log({
      step: 'error postAmountController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const putAmount = async (fiels) => {
  try {
    const { amountId, ...rest } = fiels;
    const amount = await Model.Amount.findByIdAndUpdate(amountId, rest);
    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: amount };

    //
  } catch (error) {
    console.log({
      step: 'error putAmountController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const deleteAmount = async (amountId) => {
  try {
    const amount = await Model.Amount.findOneAndDelete({ amountId });
    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: amount };

    //
  } catch (error) {
    console.log({
      step: 'error deleteAmountController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};
