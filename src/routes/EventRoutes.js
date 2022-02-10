import express from 'express';
import EventController from '../controllers/EventController.js';
import Auth from '../middlewares/Auth.js';

const router = express.Router();

router.get('/list-events', Auth.verify, EventController.list);
router.post('/save-event', Auth.verify, EventController.save);
router.delete('/delete-event/:id_event', Auth.verify, EventController.deleteById);
router.put('/update-event/:id_event', Auth.verify, EventController.updateById);

export default router;
