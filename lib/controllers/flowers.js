const { Router } = require('express');
const Flower = require('../models/Flower');
const flowerCheck = require('../utils/flower-check');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const flower = await Flower.insert(req.body);
      res.send(flower);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const flower = await Flower.getById(req.params.id);
      res.send(flower);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const flower = await Flower.getAll();
      res.send(flower);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const flower = await Flower.updateById(req.params.id, req.body);
      flowerCheck(flower);
      res.send(flower);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const flower = await Flower.deleteById(req.params.id);
      flowerCheck(flower);
      res.send(flower);
    } catch (error) {
      next(error);
    }
  });
