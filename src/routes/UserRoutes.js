import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/list-user/:id_user', UserController.listById);
router.post('/save-user', UserController.save);
router.delete('/delete-user/:id_user', UserController.deleteById);
router.put('/update-user/:id_user', UserController.updateById);

export default router;
