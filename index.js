const express = require('express')
const app = express()

app.use(express.json()) // for parsing application/json

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
    response.json(persons)
})

// POST method route
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(404).json({
      error: 'person name is missing',
    })
  }
  response.send('POST request to the homepage')

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
