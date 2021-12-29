import { Router } from 'express';

import Service from '../services';

const router = Router();

router.get('/', Service.Staff.getAll);
router.get('/:staffId', Service.Staff.getById);
router.post('/', Service.Staff.create);
router.put('/:staffId', Service.Staff.update);
router.delete('/:staffId', Service.Staff.del);

export default router;
