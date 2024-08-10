import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';


function authToken(req, res, next) {
  const allRawTokens = req.headers?.cookie;
  const appTokenName = process.env.TOKEN_NAME || 'sh-todo-token'
  const token = allRawTokens?.split(`${appTokenName}=`)?.[1] || '';

  console.log(`token: `, token);
  if (!token) {
    // FIX: return doesn't show error on FE;
    console.error('No token. Unauthorized / Invalid token.')
    return res.status(401).json({ message: 'Unauthorized / Invalid token.' });
  };

  // TODO: a0b1:
  // NOTE:
  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: 'Unauthorized / Invalid token. ' + error.message
      });
    };

    const matchedUser = await User.findByPk(decoded.userId);
    const matchedUserId = matchedUser?.dataValues?.id;

    // Give error if no user is matched
    if (!matchedUserId) res.status(401).json({
      message: 'No such user. ' + error?.message
    });

    req.decodedUserId = matchedUserId;

    next();

  });

};


export default authToken;
