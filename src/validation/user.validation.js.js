import { check } from 'express-validator';
import { validataInputs } from './validateInputs';

export const getUser = [check('_id').isMongoId().not().notEmpty(), validataInputs];
