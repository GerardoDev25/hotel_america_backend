import { Router } from 'express';
import SERVICE from '../services';

const router = Router();

router.get('/', SERVICE.getUser);
router.post('/', SERVICE.postUser);
router.put('/:_id', SERVICE.putUser);
router.delete('/:_id', SERVICE.deleteUser);

export default router;
