import { check, body } from 'express-validator';
import { validataInputs } from './validateInputs';

const getById = [check('roomId').isMongoId().notEmpty(), validataInputs];

export default { getById };
