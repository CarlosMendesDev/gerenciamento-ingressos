import Event from "../models/Event.js";

class EventController {
  async save(req, res) {
    const { type_event, name_event, max_capacity } = req.body;

    try {
      if (!type_event || !name_event || !max_capacity) throw { msg: 'Bad request', status: 500 };

      const event = await Event.create({
        name_event,
        type_event,
        max_capacity,
      });

      res.status(201).json({
        message: 'CREATED',
        event,
      });
    } catch (error) {
      res.status(500);
    };
  };

  async list(req, res) {
    try {
      const event = await Event.findAll();

      if (!event) throw { msg: 'Events not found', status: 404 };

      res.status(200).json(event);
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });;
    };
  };

  async deleteById(req, res) {
    const { id_event } = req.params;

    try {
      if (!id_event) throw { msg: 'Bad request', status: 500 };

      const event = await Event.findOne({ where: { id_event } });

      if (!event) throw { msg: 'Event not found', status: 404 };

      await event.destroy({ cascade: true });

      res.status(200).json({
        message: 'DELETED',
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    };
  };

  async updateById(req, res) {
    const { id_event } = req.params;
    const { type_event, name_event, max_capacity } = req.body;

    try {
      if (!id_event) throw { msg: 'Bad request', status: 500 };

      const event = await Event.findOne({ where: { id_event } });

      if (!event) throw { msg: 'Event not found', status: 404 };

      await event.update({
        name_event: name_event || event.name_event,
        type_event: type_event || event.type_event,
        max_capacity: max_capacity || event.max_capacity,
      });

      res.status(200).json({
        message: 'UPDATED',
        event,
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    };
  };
};

export default new EventController();
