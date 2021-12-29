import { Router } from 'express';

import Service from '../services';

const router = Router();

router.get('/', Service.Room.getAll);
router.get('/:roomId', Service.Room.getById);
router.post('/', Service.Room.create);
router.put('/:roomId', Service.Room.update);
router.delete('/:roomId', Service.Room.del);

export default router;
