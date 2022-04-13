const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')

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
  return response.json(persons)
})

// get info about phonebook
app.get('/info', (request, response) => {
  const message = `The phonebook contains ${persons.length} contacts.`
  const timestamp = new Date()
  const content = `<p>${message}</p><p>The time is: ${timestamp}</p>`
  response.send(content)
})

// get single person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((personElement) => {
    return personElement.id === id
  })
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// create single person
app.post('/api/persons', (request, response) => {
  const body = request.body

  // if name or number is missing then return error
  if (!body.name || !body.number) {
    return response.status(404).json({
      error: 'Contact must have a name and number.',
    })
  }

  // if name exists in phonebook
  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'Contact name already exists in phonebook.',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: Math.floor(Math.random() * 100),
  }

  persons = persons.concat(person)

  response.json(person)

  // use middleware to log body of post request to console
  // morgan.token('body', request => JSON.stringify(request.body))
})


// app.use(morgan(':method :url :body'))

// delete single person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
