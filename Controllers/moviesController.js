const fs = require('fs')
const path = require('path')
const { json } = require('stream/consumers')

const moviesPath = path.join(__dirname, '..', 'data', 'movies.json')
const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf-8'))


//a param middleware receives the request object, the response object, 
// the next functions and a value (returns the id) 
exports.checkId = (req, res, next, value) => {
  console.log(`movie id is: ${value}`)

  let movie = movies.find(movie => Number(movie.id) === Number(value))
 
  if (!movie) {
    //its important to always use the return inside the if to avoid errors
    return res.status(404).json({
      status: "fail",
      message: `movie with id: ${value} was not found`
    })
  }

  next()
}

//middleware to validate post request

//get all movies
exports.getAllMovies = (req, res) => {
  //jset json formating
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies
    }
  })
}


//get movie by id
exports.getMovieById = (req, res) => {
  console.log(req.params)

  //get and convert the id to number
  const id = Number(req.params.id)

  //find the movie based on the parameter
  let movie = movies.find((el) => Number(el.id) === id)
  console.log('movie encontrado:', movie)


  //if is no movie object found, show the error message 
  // if (!movie) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: `the movie with ${id} was not found!`
  //   })
  // }

  res.status(200).json({
    status: 'success',
    data: {
      movie: movie
    }
  });
}

//post request
exports.createMovie = (req, res) => {
  const newID = Number(movies[movies.length - 1].id) + 1;
  console.log(newID)

  //create a new object by merging the existing objects together
  const newMovie = Object.assign({
    id: newID
  }, req.body)
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
}

exports.validateBody = (req, res, next) => {
  //if the request body doesnt have a name fiel or release year, the json object will be sent in the response
  if (!req.body || !req.body.name || !req.body.releaseYear) {
    return res.status(400).json({
      status: 'failed',
      message: 'not a valid movie data'
    })
  } else {
    //if the request body have a name and a release year, calls the next method
    next()
  }
}

//PATCH METHOD
//we want to update thte movie based on its id
exports.updateMovie = (req, res) => {
  const id = Number(req.params.id)

  const movieToUpdate = movies.find((el) => Number(el.id) === id)
  console.log('movie retornado:', movieToUpdate)

  const movieIndex = movies.indexOf(movieToUpdate)
  console.log('index retornado:', movieIndex)

  Object.assign(movieToUpdate, req.body)

  movies[movieIndex] = movieToUpdate

  fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate
      }
    })
  })
}

//delete movie
exports.deleteMovie = (req, res) => {
  const id = req.params.id * 1;
  const movieToDelete = movies.find(el => el.id === id);

  // if (!movieToDelete) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: `No movie with the id ${id} was found to delete`
  //   })
  // }

  const index = movies.indexOf(movieToDelete)

  movies.splice(index, 1)
}