const mongoose = require('mongoose')

const vacanciesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  candidate: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
})

const Vacancies = mongoose.model('vacancies', vacanciesSchema)
module.exports = Vacancies