const { Router } = require('express');
const Movie = require('../models/Movie');
const movieCheck = require('../utils/movie-check');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const movie = await Movie.insert(req.body);
      res.send(movie);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const movie = await Movie.getById(req.params.id);
      res.send(movie);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const movies = await Movie.getAll();
      res.send(movies);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const movie = await Movie.updateById(req.params.id, req.body);
      movieCheck(movie);
      res.send(movie);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const movie = await Movie.deleteById(req.params.id);
      movieCheck(movie);
      res.send(movie);
    } catch (error) {
      next(error);
    }
  });
