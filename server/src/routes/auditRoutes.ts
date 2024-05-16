import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
	res.status(201);
});

export default router;
