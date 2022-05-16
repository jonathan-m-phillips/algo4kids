const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/parent', require('./routes/parentRoutes'))
app.use('/api/child', require('./routes/childRoutes'))
app.use('/api/avatar', require('./routes/avatarRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))