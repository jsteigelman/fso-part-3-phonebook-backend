mongoose = require('mongoose')
const url = process.env.MONGODB_URL

console.log('connecting to', url)

// connect to MongoDB
mongoose.connect(url)
    .then(result => console.log('Connected to MongoDB!'))
    .catch(error => console.log('Error connecting to MongoDB.'))

// define a mongoose model
const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// define the public interface of the module
module.exports = mongoose.model('Person', PersonSchema)