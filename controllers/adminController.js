const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');


const index = (req, res) => {
  res.render('index.ejs')
}

const createUser = () => {

}

const updateUser = () => {

}

const deleteUser = () => {

}

module.exports = {
  index,
  createUser
}