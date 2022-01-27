const { Router } = require('express');
const Book = require('../models/Book');
const bookCheck = require('../utils/book-check');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.send(book);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);
      res.send(book);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const book = await Book.getAll();
      res.send(book);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const book = await Book.updateById(req.params.id, req.body);
      bookCheck(book);
      res.send(book);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const book = await Book.deleteById(req.params.id);
      bookCheck(book);
      res.send(book);
    } catch (error) {
      next(error);
    }
  });
