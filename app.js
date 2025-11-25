const express = require('express')
const fs = require('fs')
let app = express()


//route = http method + url
//the callback function receives two arguments(request and response object)
//we need to send the status always before the response
// app.get('/', (req, res) => {
  //   // res.status(200).send('<h1>hello from express server</h1>'); //sending html
  //   res.status(200).json({ message: 'hello, world', status: 200 }) //sending a JSON object
  // });


const logger = function (req, res, next) {
  console.log('custom middleware called!')
  next()
}
  
app.use(express.json())
app.use(logger)
  
const movies = JSON.parse(fs.readFileSync('./data/movies.json'))

app.get('/api/v1/movies', (req, res) => {
  //jset json formating
  res.status(200).json({
    status: 'success',
    count: movies.length,
    data: {
      movies: movies
    }
  })
})

//get - getting the id with params

//the route handle function receives two parameters (request and response)

app.get('/api/v1/movies/:id/', (req, res) => {
  // console.log(req.params)

  //get and convert the id to number
  const id = Number(req.params.id)

  //find the movie based on the parameter
  let movie = movies.find((el) => el.id === id)
  console.log('movie encontrado:', movie)


  //if is no movie object found, show the error message 
  if (!movie) {
    return res.status(404).json({
      status: 'fail',
      message: `the movie with ${id} was not found!`
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie: movie
    }
  });

  res.send('test without optional parameter')
})

//optional parameter
app.get('/api/v1/movies/:id/:name/:x', (req, res) => {
  console.log(req.params)
  res.send('test with optional parameter')
})

//post request
app.post('/api/v1/movies', (req, res) => {
  // console.log(req.body)
  const newID = Number(movies[movies.length - 1].id) + 1;
  console.log(newID)


  //create a new object by merging the existing objects together
  const newMovie = Object.assign({ id: newID }, req.body)
  console.log('new movie:', newMovie)
  console.log('criou o objeto com o novo filme')

  movies.push(newMovie);
  console.log('fez o push para dentro da lista de filmes')

  fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
    console.log('entrou no write file')
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie
      }
    })
  })
})

console.log('terminou de atualizar o json com o novo filme')


//PATCH METHOD
app.patch('api/v1/movies/:id', (req, res) => {
  const id = Number(req.params.id)

  
})

//create a server
const port = 3000;
app.listen(port, () => {
  console.log('server has started')
})
