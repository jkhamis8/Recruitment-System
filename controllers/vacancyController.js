const express = require('express');
const router = express.Router();

const User = require('../models/userModel.js');

const index = (req, res) => {
  res.render('index.ejs')
}

const createVacancy = () => {

}

const editVacancy = () => {

}

const addCandidate = () => {

}


const withdrawCandidate = () => {

}

const deleteVacancy = () => {

}

module.exports = {
  index,
}