const express = require('express');
const router = express.Router();

const User = require('../models/userModel.js');
const Client = require('../models/clientModel.js');
const Vacancies = require('../models/vacanciesModel.js');

const index = async (req, res) => {
  const allVacancies = await Vacancies.find({})
  res.render('./layout.ejs', { page: './index.ejs', jsPath: './assets/js/indexView.js', vacancies: allVacancies })
}

const createVacancy = async (req, res) => {
  try {
    const createdVacancies = await Vacancies.create(req.body)
    await Client.findOneAndUpdate({"user": req.session.user},{ $push: { vacancies: createdVacancies._id } },)
    res.render('./layout.ejs', { page: './client/createVacancy.ejs', Message: 'Client Created successfully' })
  }
  catch (error) {
    console.log(error);
    res.render('./layout.ejs', { page: './client/createVacancy.ejs', Message: 'Please Contact Admin' })
  }
}

const viewVacancy = async (req, res) => {
  const vacancy = await Vacancies.findById(req.body.vacancyID)
  res.json({ vacancy });
}

const ManageVacancy = async (req, res) => {
  let clientVacancies=[]
  const userClient = await Client.find({"user": req.session.user});
  let userclientobj=userClient[0]
  if(userclientobj){
    clientVacancies = await Promise.all(userclientobj.vacancies.map(async(vacancy) => {
      return await Vacancies.findById(vacancy);
    }))
  }
  res.render('./layout.ejs', { page: './client/ManageVacancy.ejs', jsPath: './assets/js/indexManage.js', vacancies: clientVacancies })
}
const viewEditVacancy = async (req, res) => {
  const id = req.params.vacancyID
  const VacanciesObj = await Vacancies.findById(id)
  res.render('./layout.ejs', { page: './client/editVacancy.ejs', Vacancy: VacanciesObj })
}

const editVacancy = async (req, res) => {
  try {
    const id = req.params.vacancyID
    const vacancyObj = await Vacancies.findById(id)
    vacancyObj.set(req.body)
    vacancyObj.save()
    res.redirect("/ManageVacancy");
  }
  catch (error) {
    console.log(error);
    res.redirect("/ManageVacancy");
  }
}

const deleteVacancy = async (req, res) => {
  try {
    const vID=req.body.vacancyID
    await Client.findOneAndUpdate({"vacancies": vID},{ $pull: { vacancies: vID } })
    await Vacancies.findByIdAndDelete(vID);
    req.method = 'GET'
    res.redirect("/ManageVacancy");
  }catch (error) {
    console.log(error);
    res.redirect("/ManageVacancy");
  }
}

const applyToVacancy =  async (req, res) => {

}


const withdrawCandidate = () => {

}

module.exports = {
  index,
  createVacancy,
  viewVacancy,
  deleteVacancy,
  ManageVacancy,
  applyToVacancy,
  viewEditVacancy,
  editVacancy
}