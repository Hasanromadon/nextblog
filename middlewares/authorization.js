import db from '../../../libs/db';
import jwt from 'jsonwebtoken';

export default async function authorization(req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) return res.status(401).end();
    const authSplit = authorization.split(' ');
    const [authType, authToken] = [authSplit[0], authSplit[1]];

    if (authType !== 'Bearer') return res.status(401).end();
    return jwt.verify(authToken, 'longsecret', (err, decoded) => {
      if (err) return res.status(401).end();
      return resolve(decoded);
    });
  });
}
