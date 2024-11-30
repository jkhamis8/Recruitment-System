const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Vacancies = require('../models/vacanciesModel.js');


const viewMyVacancies = async (req, res) => {
  let candidatetVacancies=[]
  const applyedVacancies = await vacancies.find({"candidate": req.session.user});
  let applyedVacanciesobj=applyedVacancies[0]
  if(applyedVacanciesobj){
    candidatetVacancies = await Promise.all(applyedVacanciesobj.vacancies.map(async(vacancy) => {
      return await Vacancies.findById(vacancy);
    }))
  }
  res.render('./layout.ejs', { page: './candidate/index.ejs', jsPath: './assets/js/indexManage.js', vacancies: candidatetVacancies })
};

const viewProfile = async (req, res) => {
  const userInDatabase = await User.findById(req.session.user)
  res.render('./layout.ejs', { page: './candidate/profile.ejs', user: userInDatabase })
};

const editProfile = async (req, res) => {
  try {
    const userInDatabase = await User.findById(req.session.user)
    userInDatabase.set(req.body)
    userInDatabase.save()
    res.redirect("/profile");
  }
  catch (error) {
    console.log(error);
    res.redirect("/profile");
  }
};


module.exports = {
  editProfile,
  viewProfile,
  viewMyVacancies
}