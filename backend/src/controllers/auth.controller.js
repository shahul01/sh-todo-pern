"use strict";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';


const tokenName = process.env.TOKEN_NAME || 'sh-todo-token';

// @desc    Register User
// @route   POST /api/auth/sign-up
// @access  Public
// router.post('/register')
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

    // NOTE: User.create() has a fn that adds hash and salt when creating user
    // NOTE:
    const user = await User.create({ username, password });

    // TODO: Sign JWT and set Cookie here also

    res.status(201).json({ id: user.id, username: user.username });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error. ' + error.message
    });

  };
};

// router.post('/login')
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

    // NOTE:
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );


    // cookies don't set on localhost,
    // TODO: maybe you can manually set it for dev env

    // setting cookies
    res.cookie(
      tokenName, token, {
        httpOnly: true,
        // secure: true, // Use secure cookies in production
        // sameSite: 'strict', // Prevent CSRF attacks
        // maxAge: 30*24*60*60*1_000 // 30 days
      }
    );

    // if (app.get('env') === 'production') {
    //   app.set('trust proxy', 1) // trust first proxy
    //   sess.cookie.secure = true // serve secure cookies
    // }

    res.status(200).json({ token, message: 'Login successful.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error. ' + error.message
    });

  };

};

// router.post('/logout')
const logout = async (req, res) => {
  res.clearCookie(tokenName);
  res.status(200).json({
    message: 'Logged out successfully.'
  });

};


export default {
  register,
  login,
  logout,
  // resetPassword,
};
