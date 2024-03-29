const { response } = require('express');
const { verify } = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  //x-token Headers
  const token = req.header('x-token');
  if (!token)
    return res.status(401).json({ ok: false, msg: 'No token in the request' });

  try {
    const { uid, name } = verify(token, process.env.SECRET_JWT);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({ ok: false, msg: 'Invalid token' });
  }

  next();
};

module.exports = { validateJWT };
