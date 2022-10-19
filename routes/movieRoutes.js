const express = require('express');
const { getAllMovies, getMoviesByUser, createMovie, editMovie, deleteMovie } = require('../controllers/movieController');
const { authenticated } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getAllMovies);
router.post('/', authenticated, createMovie)
router.get('/favourite-movies', authenticated,getMoviesByUser);
router.put('/favourite-movies/:movieId', authenticated, editMovie);
router.delete('/favourite-movies/:movieId', authenticated, deleteMovie);

module.exports = router;