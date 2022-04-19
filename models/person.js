const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

console.log('connecting to', url)

// connect to MongoDB
mongoose.connect(url)
    .then(result => console.log('Connected to MongoDB!'))
    .catch(error => console.log('Error connecting to MongoDB.'))


// define a mongoose model
const PersonSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 2, // set to zero while I debug why validation failure causes crash
      required: true
    },
    number: {
      type: String,
      minLength: 10, // set to zero while I debug why validation failure causes crash
      required: true
    }
})

PersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

// define the public interface of the module
module.exports = mongoose.model('Person', PersonSchema)