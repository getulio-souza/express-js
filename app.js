const express = require('express')
const fs = require('fs')
let app = express()
const morgan = require(`morgan`)

const moviesRouter = require('./Routes/moviesRoutes')

app.use(express.json())

// using morgan
app.use(morgan('dev'))

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString()
  next()
})

//middleware router
app.use('/api/v1/movies', moviesRouter)

//optional parameter
moviesRouter.get('/api/v1/movies/:id/:name/:x', (req, res) => {
  console.log(req.params)
  res.send('test with optional parameter')
})

//create a server
const port = 3000;
app.listen(port, () => {
  console.log('server has started')
})
