const express = require('express');
const router = express.Router();

const User = require('../models/userModel.js');
const Vacancies = require('../models/vacanciesModel.js');

const index = async (req, res) => {
  const allVacancies = await Vacancies.find({})
  res.render('./layout.ejs', { page: './index.ejs', jsPath: './assets/js/indexView.js', vacancies: allVacancies })
}

const viewVacancy = async (req, res) => {
  console.log(req.body.vacancyID)
  const vacancy = await Vacancies.findById(req.body.vacancyID)
  res.json({ vacancy });
}

const ManageVacancy = async (req, res) => {
  const currentUser = await User.findById(req.session.user);
  currentUser.vacancies.forEach(() => {

  })
  const allVacancies = await Vacancies.find({})
  res.render('./layout.ejs', { page: './client/ManageVacancy.ejs', vacancies: allVacancies })
}

const addCandidate = () => {

}


const withdrawCandidate = () => {

}

const deleteVacancy = () => {

}

module.exports = {
  index,
  viewVacancy,
  ManageVacancy
}