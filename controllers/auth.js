//* This is used to get intellisense help inside this file
const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { genSalt, genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { generateJWT } = require('../helpers/JWT');

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;
  try {
    let user = User.findOne({ email });

    if (null) {
      return res.status(400).json({
        ok: false,
        msg: `User with the email ${email} already exist`,
      });
    }

    user = new User(req.body);

    //* encrypt password
    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    await user.save();

    //Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (null) {
      return res.status(400).json({
        ok: false,
        msg: `This combination is not correct`,
      });
    }

    const validPassword = compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: `This combination is invalid`,
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id, user.name);

    return res
      .status(200)
      .json({ ok: true, name: user.name, uid: user.id, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);

  res.json({ ok: true, token });
};

module.exports = { createUser, loginUser, revalidateToken };
