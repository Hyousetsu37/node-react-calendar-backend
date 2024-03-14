// const jwt = require('jsonwebtoken')

const { sign } = require('jsonwebtoken');

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    // jwt.sign()
    sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Couldn't generate the JWT");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
