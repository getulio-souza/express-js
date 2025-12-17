const fs = require('fs')
const path = require('path')

const moviesPath = path.join(__dirname, '..', 'data', 'movies.json')
const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf-8'))

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
}

//post request
exports.createMovie = (req, res) => {
  // console.log(req.body)
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