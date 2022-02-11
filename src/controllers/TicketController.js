import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

class TicketController {
  async save(req, res) {
    const { id_event, desc_ticket, price_ticket } = req.body;

    const { id_user } = req.decoded;

    try {
      if (!id_event) throw { msg: 'Bad request', status: 500 };

      const user = await User.findOne({ where: { id_user } });

      if (!user) throw { msg: 'User not found', status: 404 };

      const event = await Event.findOne({ where: { id_event } });

      if (!event) throw { msg: 'Event not found', status: 404 };

      const { count } = await Ticket.findAndCountAll({ where: { id_event } });

      if (count === event.max_capacity) throw { msg: 'Maximum capacity reached', status: 500 };

      const ticket = await Ticket.create({
        id_event: event.id_event,
        id_user,
        UserIdUser: id_user,
        EventIdEvent: event.id_event,
        desc_ticket,
        price_ticket,
      });

      res.status(201).json({
        message: 'CREATED',
        ticket,
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    };
  };

  async listById(req, res) {
    const { id_user } = req.decoded;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw { msg: 'User not found', status: 404 };

      const tickets = await Ticket.findAll({
        raw: true,
        include: [{
          model: Event,
          required: true,
          attributes: ['name_event'],
        }],
      });

      if (!tickets) throw { msg: 'Tickets not found', status: 404 };

      res.status(200).json(tickets);
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    };
  };

  async deleteById(req, res) {
    const { id_ticket } = req.params;

    const { id_user } = req.decoded;

    try {
      if (!id_ticket) throw { msg: 'Bad request', status: 500 };

      const user = await User.findOne({ where: { id_user } });

      if (!user) throw { msg: 'User not found', status: 404 };

      const ticket = await Ticket.findOne({ where: {
        id_user,
        id_ticket,
      } });

      if (!ticket) throw { msg: 'Ticket not found', status: 404 };

      await ticket.destroy();

      res.status(200).json({
        message: 'DELETED',
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    };
  };
};

export default new TicketController();
