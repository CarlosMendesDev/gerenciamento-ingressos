import express from 'express';
import TicketController from '../controllers/TicketController.js';

const router = express.Router();

router.post('/save-ticket', TicketController.save);
router.get('/list-tickets/:user_login', TicketController.listByLogin);
router.delete('/delete-ticket/:user_login/:id_ticket', TicketController.deleteById);

export default router;
