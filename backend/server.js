const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./_middleware/errorMiddleware')
const connectDB = require('./_config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/admin', require('./admin/routes/adminRoutes'))
app.use('/api/course', require('./course/routes/courseRoutes'))
app.use('/api/parent', require('./parent/routes/parentRoutes'))
app.use('/api/child', require('./child/routes/childRoutes'))
app.use('/api/avatar', require('./avatar/routes/avatarRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))