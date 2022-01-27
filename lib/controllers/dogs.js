const { Router } = require('express');
const Dog = require('../models/Dog');
const dogCheck = require('../utils/dog-check');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const dog = await Dog.insert(req.body);
      res.send(dog);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.getById(req.params.id);
      res.send(dog);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const dogs = await Dog.getAll();
      res.send(dogs);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.updateById(req.params.id, req.body);
      dogCheck(dog);
      res.send(dog);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.deleteById(req.params.id);
      dogCheck(dog);
      res.send(dog);
    } catch (error) {
      next(error);
    }
  });
