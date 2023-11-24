import jwt from 'jsonwebtoken';


function authToken(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized / Invalid token. '
    })
  };

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json( {
        message: 'Unauthorized / Invalid token. ' + error.message
      })
    };

    req.userId = decoded.userId;

    next();

  })

};


export default authToken;
