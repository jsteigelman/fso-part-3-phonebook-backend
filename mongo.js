require('dotenv').config()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URL

mongoose.connect(url)

// define a mongoose model
const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)