import jwt from 'jsonwebtoken';

class Auth {
  verify(req, res, next) {
    const { authorization	} = req.headers;

    try {
      const [_, token] = authorization.split(' ');

      const isValidToken = jwt.verify(token, process.env.JWT_KEY);

      if(!isValidToken) throw new Error('Not Authorization');

      const decoded = jwt.decode(token, process.env.JWT_KEY);

      res.decoded = { id_user: decoded.iss };

      next();
    } catch (error) {
      res.status(404).json(error);
    };
  };
};

export default new Auth();
