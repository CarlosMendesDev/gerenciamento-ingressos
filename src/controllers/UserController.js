import User from '../models/User.js';

class UserController {
  async save(req, res) {
    const { name, user_login, user_password } = req.body

    try {
      const user = await User.create({
        name,
        user_login,
        user_password
      });

      res.status(201).json({
        message: 'CREATED',
        user
      });
    } catch (error) {
      res.status(500);
    };
  };

  async list(req, res) {
    const { user_login } = req.params;

    try {
      const user = await User.findOne({ where: { user_login } });

      if (!user) throw new Error('User not found');

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };

  async deleteById(req, res) {
    const { id_user } = req.params;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw new Error('User not found');

      await user.destroy();

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
    const { id_user } = req.params;
    const { name, user_login, user_password } = req.body;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw new Error('User not found');

      await user.update({
        name: name || user.name,
        user_login: user_login || user.user_login,
        user_password: user_password || user.user_password
      });

      res.status(200).json({
        message: 'UPDATED',
        user
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    };
  };
};

export default new UserController();