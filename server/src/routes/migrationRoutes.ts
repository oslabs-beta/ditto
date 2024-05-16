import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
	res.status(201);
});

router.patch('/', (req, res) => {
	res.status(200);
});

export default router;
