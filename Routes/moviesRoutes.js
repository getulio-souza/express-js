const express = require('express')
const moviesController = require('../Controllers/moviesController')
const moviesRouter = express.Router()

const router = express.Router()

router.param('id', (req, res, next, value) => {
  console.log(`movie id is ${value}`);
  next()
})

router.route('/')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie)

router.route('/:id')
  .get(moviesController.getMovieById)
  .patch(moviesController.updateMovie)

module.exports = router;