const express = require('express')
const moviesController = require('../Controllers/moviesController')
const moviesRouter = express.Router()

const router = express.Router()

router.param('id', moviesController.checkId)

router.route('/')
  .get(moviesController.getAllMovies)

  //calling the validate body middleware
  .post(moviesController.validateBody, moviesController.createMovie)

  //setting the routes
router.route('/:id')
  .get(moviesController.getMovieById)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie)

module.exports = router;