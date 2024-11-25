const express = require('express');
const router = express.Router();

const Vacancies = require('../models/vacanciesModel.js');

const index = async (req, res) => {
  const allVacancies = await Vacancies.find({})
  res.render('./layout.ejs', { page: './index.ejs', vacancies: allVacancies })
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