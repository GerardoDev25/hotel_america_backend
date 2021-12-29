import { check } from 'express-validator';
import { validataInputs } from './validateInputs';

const getById = [check('roomId').isMongoId().not().notEmpty(), validataInputs];

export default { getById };
