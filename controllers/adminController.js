const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt')

const index = (req, res) => {
  res.render('index.ejs')
}

const createClientUser = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (userInDatabase) {
      return res.send('username is already taken')
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashPassword
    req.body.role = 'Client'
    const createdUser = await User.create(req.body)
    res.render('./layout.ejs', { page: './admin/createClientUser.ejs', Message: 'Client Created successfully' })
  }
  catch (error) {
    console.log(error);
    res.render('./layout.ejs', { page: './admin/createClientUser.ejs', Message: 'Please Contact Admin' })
  }
}

const updateUser = () => {

}

const deleteUser = () => {

}

module.exports = {
  index,
  createClientUser
}