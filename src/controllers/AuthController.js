import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

class AuthController {
  async login(req, res) {
    const { user_login, user_password } = req.body;

    try {
      if (!user_login && !user_password) throw { msg: 'Bad request', status: 500 };

      const user = await User.findOne({ where: { user_login } });

      if (!user) throw { msg: 'User not found', status: 404 };

      const isValidPassword = await bcrypt.compare(user_password, user.user_password);

      if (!isValidPassword) throw { msg: 'Invalid password', status: 401 };

      const token = jwt.sign({ iss: user.id_user }, process.env.JWT_KEY, { expiresIn: '1h' });

      res.setHeader('Authorization', `Bearer ${token}`);

      res.status(200).json({
        message: 'LOGED',
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.msg || error,
      });
    }
  };
};

export default new AuthController();
