import jwt from 'jsonwebtoken';


function authToken(req, res, next) {

  const rawToken = req.headers?.cookie;
  const token = rawToken?.split('=')?.[1] || '';

  if (!token) {

    // return doesnt catch error on FE, throw error instead?
    return res.status(401).json({
      message: 'Unauthorized / Invalid token.'
    })
  };

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json( {
        message: 'Unauthorized / Invalid token. ' + error.message
      });
    };

    req.userId = decoded.userId;

    next();

  })

};


export default authToken;
