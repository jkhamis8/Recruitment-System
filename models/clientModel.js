const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  vacancies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "vacancies"
  }],
})

const Client = mongoose.model('client', clientSchema)
module.exports = Client