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

// const addPerson = new Person({
//   name: process.argv[2],
//   number: process.argv[3]
// })

// if person info not provided, list all current contacts
// if (process.argv.length <= 2) {
//     Person.find({}).then((result) => {
//       result.forEach((person) => {
//         console.log(`Person: ${person.name} ${person.number}`)
//       })
//       mongoose.connection.close()
//     })
//   } else {
//     addPerson.save().then(result => {
//         console.log(`Added ${process.argv[2]} number ${process.argv[3]} to phonebook`)
//         mongoose.connection.close()
//       })
//   }
