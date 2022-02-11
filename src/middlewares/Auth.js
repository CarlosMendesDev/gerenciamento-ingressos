import jwt from 'jsonwebtoken';

class Auth {
  verify(req, res, next) {
    const { authorization	} = req.headers;

    try {
      const [_, token] = authorization.split(' ');

      const isValidToken = jwt.verify(token, process.env.JWT_KEY);

      if(!isValidToken) throw { msg: 'Not Authorization', status: 401 };

      const decoded = jwt.decode(token, process.env.JWT_KEY);

      req.decoded = { id_user: decoded.iss };

      next();
    } catch (error) {
      res.status(error?.status || 500).json(error?.msg || error);
    };
  };
};

export default new Auth();
