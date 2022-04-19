require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json()) // for parsing application/json
// app.use(morgan(':method :url :body')) 
app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

// GET method route
app.get('/', (request, response) => {
  response.send('GET request to the homepage')
})

// get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// get info about phonebook
app.get('/info', async (request, response) => {
  const totalDocs = await Person.countDocuments()
  const message = `The phonebook contains ${totalDocs} contacts.`
  const timestamp = new Date()
  const content = `<p>${message}</p><p>The time is: ${timestamp}</p>`
  response.send(content)
})

// get single person
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => response.json(person))
    .catch(error => console.log(response.status(404).end()))
})

// create single person
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if name or number is missing then return error
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Contact must have a name and number.',
    })
  }

  // if name exists in phonebook, prevent duplicate entry
  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'Contact name already exists in phonebook.',
    })
  }

  // try {
  //   const person = new Person({
  //     name: body.name,
  //     number: body.number,
  //     date: new Date(),
  //     id: Math.floor(Math.random() * 100),
  //   })
  
  //   persons = persons.concat(person)
  
  //   person.save().then(savedPerson => {
  //     response.json(savedPerson)
  //   })
  // } catch (error) {
  //   if (error.name === "ValidationError") {
  //     return console.log('hi')
  //   }

  //   return console.log('Error in catch block')
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
    id: Math.floor(Math.random() * 100),
  })

  persons = persons.concat(person)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))


  // response.json(person)

  // use middleware to log body of post request to console
  // morgan.token('body', request => JSON.stringify(request.body))
})


// app.use(morgan(':method :url :body'))

// update a person
app.put('/api/persons/:id', (request, response, next) => {
  const updatedData = request.body
  
  const updatedPerson = {
    number: updatedData.number
  }

  const opts = { 
    new: true,
    runValidators: true 
  }

  // Pre hook for `findOneAndUpdate`
  // Person.pre('findOneAndUpdate', function(next) {
  //   this.options.new = true
  //   this.options.runValidators = true
  //   next()
  // });

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true, runValidators: true })

  // Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// delete single person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// handle errors
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
