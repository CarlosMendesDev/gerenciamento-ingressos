import Event from "../models/Event.js";

class EventController {
  async save(req, res) {
    const { type_event, name_event } = req.body

    try {
      const event = await Event.create({
        name_event,
        type_event
      });

      res.status(201).json({
        message: 'CREATED',
        event
      });
    } catch (error) {
      res.status(500);
    };
  };

  async list(req, res) {
    try {
      const event = await Event.findAll();

      res.status(200).json(event);
    } catch (error) {
      res.status(500);
    };
  };

  async deleteById(req, res) {
    const { id_event } = req.params;

    try {
      const event = await Event.findOne({ where: { id_event } });

      if (!event) throw new Error('Event not found');

      await event.destroy();

      res.status(200).json({
        message: 'DELETED',
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };

  async updateById(req, res) {
    const { id_event } = req.params;
    const { type_event, name_event } = req.body;

    try {
      const event = await Event.findOne({ where: { id_event } });

      if (!event) throw new Error('Event not found');

      await event.update({
        name_event: name_event || event.name_event,
        type_event: type_event || event.type_event
      });

      res.status(200).json({
        message: 'UPDATED',
        event
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };
};

export default new EventController();
