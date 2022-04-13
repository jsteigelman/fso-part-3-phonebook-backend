const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json()) // for parsing application/json
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

// get all persons
// app.get('/api/persons', (request, response) => {
//   return response.json(persons)
// })

exports.handler = async function (event, context) {
    try {
        const response = app.get('/api/persons')
        console.log('exports handler is running!')
        return {
            statusCode: 200,
            body: JSON.stringify(response.json(persons))
          }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }

  }