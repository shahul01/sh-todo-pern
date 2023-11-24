"use strict";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';


const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with username already exists.'
      })
    };

    const user = await User.create({ username, password });

    res.status(201).json({ id: user.id, username: user.username });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error. ' + error.message
    });

  };
};

const login = async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials. User doesn't exist."
      });
    };

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Password doesn't match."
      })
    };

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );

    res.cookie(
      'token', token, {
        httpOnly: true,
        // secure: true,
        // sameSite: 'none'
      }
    );

    res.status(200).json({ token, message: 'Login successful.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error. ' + error.message
    });

  };

};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logged out succesfully.'
  });

};


export default {
  register,
  login,
  logout,
  // resetPassword,
};
