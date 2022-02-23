// import { check } from 'express-validator';
import { validataInputs, validateRole, verifyId } from '../helpers/validateInputs';

const getById = verifyId('lodgingId');

const create = [...validateRole(['role_reception']), validataInputs];

const update = [...validateRole(['role_reception']), ...verifyId('lodgingId')];

const del = [...validateRole(['role_reception']), ...verifyId('registerId')];

export default { create, update, del, getById };
