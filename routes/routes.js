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

//
route.get('/createClientUser', async (req, res) => {
  res.render('./layout.ejs', { page: './admin/createClientUser.ejs' })
});
route.post('/createClientUser', adminController.createClientUser)


route.get('/admin', adminController.index)
route.get('/candidate', candidateController.index)
route.get('/client', clientController.index)

/////////////////Vacancy

route.get('/addVacancy', async (req, res) => {
  res.render('./layout.ejs', { page: './client/createVacancy.ejs' })
});
route.post('/addVacancy', clientController.createVacancy)

route.get('/ManageVacancy', vacancyController.ManageVacancy)


route.post('/viewVacancy', vacancyController.viewVacancy)


// route.post('/admin', carController.create)
// route.put("/cars/:id", carController.updateCar);
// route.delete("/cars/:id", carController.deleteCar);

module.exports = route