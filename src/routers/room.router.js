import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Room.getAll);
router.get('/:roomId', Validator.Room.verifyId, Service.Room.getById);
router.post('/', Validator.Room.create, Service.Room.create);
router.put('/:roomId', Validator.Room.verifyId, Service.Room.update);
router.delete('/:roomId', Validator.Room.verifyId, Service.Room.del);

export default router;
