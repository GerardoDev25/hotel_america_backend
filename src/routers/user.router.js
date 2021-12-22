import { Router, response, request } from 'express';

const router = Router();

router.get('/', (req = request, res = response) => {
  const query = req.query;

  res.json({
    msg: 'get API - user',
    query,
  });
});

export default router;
