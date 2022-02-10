import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

class TicketController {
  async save(req, res) {
    const { id_event, desc_ticket, price_ticket } = req.body

    const { id_user } = req.decoded;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw new Error('User not found');

      const event = await Event.findOne({ where: { id_event } });

      if (!event) throw new Error('Event not found');

      const { count } = await Ticket.findAndCountAll({ where: { id_event } });

      if (count === event.max_capacity) throw new Error('Maximum capacity reached');

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
        ticket
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };

  async listById(req, res) {
    const { id_user } = req.decoded;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw new Error('User not found');

      const tickets = await Ticket.findAll({ where: { id_user } });

      if (!tickets) throw new Error('Tickets not found');

      res.status(200).json(tickets);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };

  async deleteById(req, res) {
    const { id_ticket } = req.params;

    const { id_user } = req.decoded;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw new Error('User not found');

      const ticket = await Ticket.findOne({ where: {
        id_user,
        id_ticket
      } });

      if (!ticket) throw new Error('Ticket not found');

      await ticket.destroy();

      res.status(200).json({
        message: 'DELETED',
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };
};

export default new TicketController();
