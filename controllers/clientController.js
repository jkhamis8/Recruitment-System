const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Vacancies = require('../models/vacanciesModel.js');

const index = (req, res) => {
  res.render('index.ejs')
}

const createVacancy = async (req, res) => {
  try {


    const createdVacancies = await Vacancies.create(req.body)
    let addVacancyToClient = await User.findById(req.session.user);
    console.log(req.session.user._id);
    addVacancyToClient.messages.push(createdVacancies._id);
    await addVacancyToClient.save();

    res.render('./layout.ejs', { page: './client/createVacancy.ejs', Message: 'Client Created successfully' })
  }
  catch (error) {
    console.log(error);
    res.render('./layout.ejs', { page: './client/createVacancy.ejs', Message: 'Please Contact Admin' })
  }
}


const editClient = () => {

}

const deleteClient = () => {

}

module.exports = {
  index,
  createVacancy
}