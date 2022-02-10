import express from 'express';
import TicketController from '../controllers/TicketController.js';
import Auth from '../middlewares/Auth.js';

const router = express.Router();

router.post('/save-ticket', Auth.verify, TicketController.save);
router.get('/list-tickets', Auth.verify, TicketController.listById);
router.delete('/delete-ticket/:id_ticket', Auth.verify, TicketController.deleteById);

export default router;
