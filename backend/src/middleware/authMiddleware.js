import jwt from 'jsonwebtoken';


function authToken(req, res, next) {

  const allRawTokens = req.headers?.cookie;
  const tokenName = process.env.TOKEN_NAME || 'sh-todo-token'

  const token = allRawTokens?.split(`${tokenName}=`)?.[1] || '';

  if (!token) {

    // return doesnt catch error on FE, throw error instead?
    return res.status(401).json({
      message: 'Unauthorized / Invalid token.'
    })
  };

  // NOTE:
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json( {
        message: 'Unauthorized / Invalid token. ' + error.message
      });
    };

    req.userId = decoded.userId;

    next();

  });

};


export default authToken;
