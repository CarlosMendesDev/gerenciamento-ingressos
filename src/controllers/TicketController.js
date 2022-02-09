import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

class TicketController {
  async save(req, res) {
    const { user_login, id_event, desc_ticket, price_ticket } = req.body

    try {
      const user = await User.findOne({ where: { user_login } });

      if (!user) throw new Error('User not found');

      const event = await Event.findOne({ where: { id_event } });

      if (!event) throw new Error('Event not found');

      const ticket = await Ticket.create({
        id_event: event.id_event,
        id_user: user.id_user,
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

  async listByLogin(req, res) {
    const { user_login } = req.params;

    try {
      const user = await User.findOne({ where: { user_login } });

      if (!user) throw new Error('User not found');

      const tickets = await Ticket.findAll({ where: { id_user: user.id_user } });

      if (!tickets) throw new Error('Tickets not found');

      res.status(200).json(tickets);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };

  async deleteById(req, res) {
    const { user_login, id_ticket } = req.params;

    try {
      const user = await User.findOne({ where: { user_login } });

      if (!user) throw new Error('User not found');

      const ticket = await Ticket.findOne({ where: {
        id_user: user.id_user,
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
