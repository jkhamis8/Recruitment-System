const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Vacancies = require('../models/vacanciesModel.js');
const bcrypt = require('bcrypt')

const viewMyVacancies = async (req, res) => {
  let candidateVacancies = []
  const appliedVacancies = await Vacancies.find({ "candidate": req.session.user });
  let appliedVacanciesObj = appliedVacancies[0]
  if (appliedVacanciesObj) {
    candidateVacancies = await Promise.all(appliedVacanciesObj.vacancies.map(async (vacancy) => {
      return await Vacancies.findById(vacancy);
    }))
  }
  res.render('./layout.ejs', { page: './candidate/index.ejs', jsPath: './assets/js/indexManage.js', vacancies: candidateVacancies })
};

const viewProfile = async (req, res) => {
  const userInDatabase = await User.findById(req.session.user)
  res.render('./layout.ejs', { page: './candidate/profile.ejs', user: userInDatabase })
};

const editProfile = async (req, res) => {
  try {
    const userInDatabase = await User.findById(req.session.user)
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashPassword
    userInDatabase.set(req.body)
    userInDatabase.save()
    res.redirect("/profile");
  }
  catch (error) {
    console.log(error);
    res.redirect("/profile");
  }
};

const applyToVacancy = async (req, res) => {
  try {
    await Vacancies.findByIdAndUpdate(req.body.vacancyID, { $push: { candidate: req.session.user } },)
    res.redirect("/");
  }
  catch (error) {
    console.log(error);
    res.redirect("/");
  }
}



const withdrawCandidate = async (req, res) => {
  try {
    await Vacancies.findByIdAndUpdate(req.body.vacancyID, { $pull: { candidate: req.session.user } })
    req.method = 'GET'
    res.redirect("/myVacancies");
  } catch (error) {
    console.log(error);
    res.redirect("/myVacancies");
  }
}

module.exports = {
  editProfile,
  viewProfile,
  viewMyVacancies,
  applyToVacancy,
  withdrawCandidate
}