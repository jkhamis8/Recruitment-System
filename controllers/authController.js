const express = require("express");
const router = express.Router();
const user = require('../models/userModel')
const bcrypt = require('bcrypt')

const signUp = async (req,res) => {
  const userInDatabase = await user.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send('username is already taken')
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("password and Confirm Password Must Match")
  }
  const hashPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashPassword
  const createdUser = await user.create(req.body)
  res.send(`Thanks for signing up ${createdUser.username}`)
  //res.render("auth/sign-in.ejs");
};

const signIn = async (req,res) => {
  const userInDatabase = await user.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send('username is not correct')
  }
  if (bcrypt.compareSync(req.body.password, userInDatabase.password)) {
    req.session.user = {
      username: userInDatabase.username,
      role:userInDatabase.role,
      _id: userInDatabase._id
    }
    res.redirect('/')
  } else {
    return res.send('Password is not correct')
  }

};

module.exports = {
  signUp,
  signIn,
};
