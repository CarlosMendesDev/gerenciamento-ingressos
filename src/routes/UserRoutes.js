import express from 'express';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';
import Auth from '../middlewares/Auth.js';

const router = express.Router();

router.post('/login', AuthController.login);

router.get('/list-user', Auth.verify, UserController.listById);
router.post('/save-user', UserController.save);
router.delete('/delete-user', Auth.verify, UserController.deleteById);
router.put('/update-user', Auth.verify, UserController.updateById);

export default router;
