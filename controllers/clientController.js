const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Vacancies = require('../models/vacanciesModel.js');

const index = (req, res) => {
  res.render('index.ejs')
}




const editClient = () => {

}

const deleteClient = () => {

}

module.exports = {
  index
}