import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Room.getAll);

router.get('/search/', Service.Room.getOne);

router.get('/:roomId', Validator.verifyId('roomId'), Service.Room.getById);

router.post('/', [...Validator.validateRole(['role_admin', 'role_reception']), ...Validator.Room.create], Service.Room.create);

router.put('/:roomId', [...Validator.validateRole(['role_admin']), ...Validator.verifyId('roomId')], Service.Room.update);

router.delete('/:roomId', [...Validator.validateRole(['role_admin']), ...Validator.verifyId('roomId')], Service.Room.del);

export default router;
