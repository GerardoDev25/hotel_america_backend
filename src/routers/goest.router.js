import { Router } from 'express';

import Service from '../services';

const router = Router();

router.get('/', Service.Goest.getAll);
router.get('/:goestId', Service.Goest.getById);
router.post('/', Service.Goest.create);
router.put('/:goestId', Service.Goest.update);
router.delete('/:goestId', Service.Goest.del);

export default router;
