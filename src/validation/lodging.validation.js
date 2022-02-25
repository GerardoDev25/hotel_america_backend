import { validataInputs, validateRole, verifyId } from '../helpers/validateInputs';

const getById = verifyId('lodgingId');

const create = [...validateRole(['role_reception']), validataInputs];

const update = [...validateRole(['role_reception']), ...verifyId('lodgingId')];

export default { create, update, getById };
