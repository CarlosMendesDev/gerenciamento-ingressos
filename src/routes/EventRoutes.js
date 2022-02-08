import express from 'express';
import EventController from '../controllers/EventController.js';

const router = express.Router();

router.get('/list-events', EventController.list);
router.post('/save-event', EventController.save);
router.delete('/delete-event/:id_event', EventController.deleteById);
router.put('/update-event/:id_event', EventController.updateById);

export default router;
