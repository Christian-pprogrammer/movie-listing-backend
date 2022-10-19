const { Movie } = require('../models');

exports.createMovie = async (req, res) => {
  console.log(req.user)
  try{
    const createdMovie = await Movie.create({
      movieName: req.body.movieName,
      rating: req.body.rating,
      cast: req.body.cast,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      userId: req.user.id
    })
    res.status(201).json(createdMovie);
  }catch(err) {
    res.status(500).json(err);
  }
}

exports.getAllMovies = async (req,res) => {
  try{
    const movies = await Movie.findAll({where: {movieStatus: 'active'}});
    res.status(200).json(movies);
  }catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
}

exports.getMoviesByUser = async (req,res) => {
  try{
    const movies = await Movie.findAll({where: {userId: req.user.id, movieStatus: 'active'}});
    res.status(200).json(movies);
  }catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
}

exports.editMovie = async (req,res) => {
  try{
    const movie = await Movie.findOne({where: {id: req.params.movieId}});
    if(!movie) {
      return res.status(404).json({message: 'movie not found'});
    }
    if(movie.userId != req.user.id) {
      return res.status(403).json({
        message: 'forbidden'
      })
    }
    const updated = await movie.update(req.body);
    res.status(200).json(updated);
  }catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
}

exports.deleteMovie = async (req,res) => {
  try{
    const movie = await Movie.findOne({where: {id: req.params.movieId}});
    if(!movie) {
      return res.status(404).json({message: 'movie not found'});
    }
    if(movie.userId != req.user.id) {
      return res.status(403).json({
        message: 'forbidden'
      })
    }
    //to delete we only change movie status to deleted but keep it in db
    await movie.update({movieStatus: 'deleted'});
    res.status(200).json({
      message: "removed successfully"
    });
  }catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
}