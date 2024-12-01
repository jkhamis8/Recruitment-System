const User = require('../models/userModel.js');
const Vacancies = require('../models/vacanciesModel.js');
const bcrypt = require('bcrypt')

const viewMyJobs = async (req, res) => {
  let candidateVacancies = []
  const appliedVacancies = await Vacancies.find({ "candidate": req.session.user });
  if (appliedVacancies) {
    candidateVacancies = await Promise.all(appliedVacancies.map(async (vacancy) => {
      if(vacancy.candidate.includes(req.session.user._id)){
        return vacancy
      }
    }))
  }
  res.render('./layout.ejs', { page: './candidate/index.ejs', jsPath: './assets/js/myJobs.js', vacancies: candidateVacancies })
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

const withdrawApplication = async (req, res) => {
  try {
    await Vacancies.findByIdAndUpdate(req.body.vacancyID, { $pull: { candidate: req.session.user._id } })
    req.method = 'GET'
    res.redirect("/myJobs");
  } catch (error) {
    console.log(error);
    res.redirect("/myJobs");
  }
}

module.exports = {
  editProfile,
  viewProfile,
  viewMyJobs,
  applyToVacancy,
  withdrawApplication
}