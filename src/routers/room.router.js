import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.Room.getAll);

router.get('/search/', Service.Room.getOne);

router.post('/where', Service.Room.getWhere);

router.get('/:roomId', Validator.Room.getById, Service.Room.getById);

router.post('/', Validator.Room.create, Service.Room.create);

router.put('/:roomId', Validator.Room.update, Service.Room.update);

router.delete('/:roomId', Validator.Room.del, Service.Room.del);

export default router;
