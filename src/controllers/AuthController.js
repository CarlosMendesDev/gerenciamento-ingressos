import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

class AuthController {
  async login(req, res) {
    const { user_login, user_password } = req.body;

    try {
      const user = await User.findOne({ where: { user_login } });

      if (!user) throw new Error('User not found');

      const isValidPassword = await bcrypt.compare(user_password, user.user_password);

      if (!isValidPassword) throw new Error('Invalid password');

      const token = jwt.sign({ iss: user.id_user }, process.env.JWT_KEY, { expiresIn: '1h' });

      res.setHeader('Authorization', `Bearer ${token}`);

      res.status(200).json({
        message: 'LOGED'
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: error.message,
      });
    }
  };
};

export default new AuthController();
