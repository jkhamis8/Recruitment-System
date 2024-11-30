const bcrypt = require('bcrypt')
const User = require('../models/userModel.js');
const Client = require('../models/clientModel.js');

const createClientUser = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (userInDatabase) {
      return res.send('username is already taken')
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashPassword
    req.body.role = 'Client'
    const createdUser = await User.create(req.body)
    res.render('./layout.ejs', { page: './admin/createClientUser.ejs', Message: 'Client User Created successfully' })
  }
  catch (error) {
    console.log(error);
    res.render('./layout.ejs', { page: './admin/createClientUser.ejs', Message: 'Please Contact Admin' })
  }
}

const createClientView = async (req, res) => {
  const allUsers = await User.find({})
  res.render('./layout.ejs', { page: './admin/createClient.ejs', users:allUsers })
}

const createClient = async (req, res) => {
  try {
    const clientInDatabase = await Client.findOne({ name: req.body.name })
    if (clientInDatabase) {
      return res.send('Namw is already taken')
    }
  
    const createdclient = await Client.create(req.body)
    const allUsers = await User.find({})
    res.render('./layout.ejs', { page: './admin/createClient.ejs', Message: 'Client Created successfully', users:allUsers })
  }
  catch (error) {
    console.log(error);
    res.render('./layout.ejs', { page: './admin/createClient.ejs', Message: 'Please Contact Admin' })
  }
}


module.exports = {
  createClientUser,
  createClientView,
  createClient
}