import User from '../models/User.js';
import bcrypt from 'bcrypt';

class UserController {
  async save(req, res) {
    const { name, user_login, user_password } = req.body;

    const password = await bcrypt.hash(user_password, 10);

    try {
      if (!name || !user_login || !user_password) throw { msg: 'Bad request', status: 500 };

      const user = await User.create({
        name,
        user_login,
        user_password: password,
      });

      res.status(201).json({
        message: 'CREATED',
        user,
      });
    } catch (error) {
      res.status(eror.status).json({
        message: error?.msg || error,
      });
    };
  };

  async listById(req, res) {
    const { id_user } = req.decoded;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw { msg: 'User not found', status: 404 };

      res.status(200).json({
        name: user.name,
        user_login: user.user_login,
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    };
  };

  async deleteById(req, res) {
    const { id_user } = req.decoded;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw { msg: 'User not found', status: 404 };

      await user.destroy({ cascade: true });

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
    const { id_user } = req.decoded;
    const { name, user_login, user_password } = req.body;

    try {
      const user = await User.findOne({ where: { id_user } });

      if (!user) throw { msg: 'User not found', status: 404 };

      const password = !user_password
        ? await bcrypt.hash(user_password, 10)
        : user.user_password;

      await user.update({
        name: name || user.name,
        user_login: user_login || user.user_login,
        user_password: password,
      });

      res.status(200).json({
        message: 'UPDATED',
        user,
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    };
  };
};

export default new UserController();