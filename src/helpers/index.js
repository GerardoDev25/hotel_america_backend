import moment from 'moment';
import Controller from '../controllers';

export const existItems = async (ids = {}) => {
  //

  const values = Object.entries(ids);
  let existBool = true;

  try {
    const querys = [];

    for (const value of values) {
      switch (value[0]) {
        case 'amountId':
          const amountId = value[1];
          querys.push(Controller.Amount.getById(amountId));

        case 'goestId':
          const goestId = value[1];
          querys.push(Controller.Goest.getById(goestId));
          break;

        case 'registerId':
          const registerId = value[1];
          querys.push(Controller.Register.getById(registerId));
          break;

        case 'roomId':
          const roomId = value[1];
          querys.push(Controller.Room.getById(roomId));
          break;

        case 'staffId':
          const staffId = value[1];
          querys.push(Controller.Staff.getById(staffId));
          break;

        case 'loggingId':
          const loggingId = value[1];
          querys.push(Controller.Lodging.getById(loggingId));
          break;

        default:
          throw new Error(`invalid param: ${value[0]}`);
      }
    }

    const existArr = await Promise.all([...querys]);

    existArr.forEach((e) => {
      if (!e.ok) existBool = false;
    });
    return existBool;

    //
  } catch (error) {
    console.log({ step: 'error existItems.helpers', error: error.toString() });
    return false;
  }
};

export const getAllRegistersItems = async () => {
  try {
    const limit = 0;
    const { ok, data } = await Controller.Register.getAll(limit);
    if (!ok) return [];

    const { rows = [] } = data;
    const items = rows.map((item) => ({ registerId: item.data[0]._id.toString(), amount: item.data[0].price }));

    return items;

    //
  } catch (error) {
    console.log({ step: 'error getAllRegistersItems.helpers', error: error.toString() });
    return [];
  }
};

export const getAllGoestsItems = async () => {
  try {
    const limit = 0;
    const now = moment().format('L');
    const { ok, data } = await Controller.Goest.getAll(limit);
    if (!ok) return [];

    const { rows = [] } = data;
    const itemsFilter = rows.filter((item) => item.date !== now);

    const items = itemsFilter.map((item) => ({
      goestId: item.data[0]._id.toString(),
      registerId: item.data[0].registerId.toString(),
      name: item.data[0].name + item.data[0].lastName,
      numberRoom: item.data[0].numberRoom,
    }));

    return items;

    //
  } catch (error) {
    console.log({ step: 'error getAllGoestsItems.helpers', error: error.toString() });
    return [];
  }
};
