const express = require('express')
const route = express.Router()

const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const candidateController = require('../controllers/candidateController')
const clientController = require('../controllers/clientController')
const vacancyController = require('../controllers/vacancyController')

route.get('/', vacancyController.index)

////////////////////Auth
route.get("/sign-up", async (req, res) => {
  res.render('./layout.ejs', { page: './auth/sign-up.ejs' })
});
route.get("/sign-in", async (req, res) => {
  res.render('./layout.ejs', { page: './auth/sign-in.ejs' })
});
route.post("/sign-up", authController.signUp);
route.post("/sign-in", authController.signIn);
route.get("/sign-out", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
/////////////////End Auth

//////////// admin
route.get('/createClient', adminController.createClientView)
route.post('/createClient', adminController.createClient)
route.get('/createClientUser', async (req, res) => {
  res.render('./layout.ejs', { page: './admin/createClientUser.ejs' })
});
route.post('/createClientUser', adminController.createClientUser)
/////////////////////////

/////////////candidate
route.get('/myVacancies', candidateController.viewMyVacancies)
route.get('/profile', candidateController.viewProfile)
route.post('/profile', candidateController.editProfile)
/////////////////


/////////////////Vacancy

route.get('/addVacancy', async (req, res) => {
  res.render('./layout.ejs', { page: './client/createVacancy.ejs' })
});
route.post('/addVacancy', vacancyController.createVacancy)

route.get('/ManageVacancy', vacancyController.ManageVacancy)
route.get('/editVacancy/:vacancyID', vacancyController.viewEditVacancy)
route.post('/editVacancy/:vacancyID', vacancyController.editVacancy)
route.post('/viewVacancy', vacancyController.viewVacancy)
route.post('/deleteVacancy', vacancyController.deleteVacancy)


module.exports = route