const express = require('express')
const cors = require('cors')
const dontenv = require('dotenv')

const database = require('./database/config')

const users = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())

/*rotas */
app.use('/api/users', users)

dontenv.config()

database.connect()

module.exports = app