const { Router } = require('express');
const Funko = require('../models/Funko');
const funkoCheck = require('../utils/funko-check');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const funko = await Funko.insert(req.body);
      res.send(funko);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const funko = await Funko.getById(req.params.id);
      res.send(funko);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const funkos = await Funko.getAll();
      res.send(funkos);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const funko = await Funko.updateById(req.params.id, req.body);
      funkoCheck(funko);
      res.send(funko);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const funko = await Funko.deleteById(req.params.id);
      funkoCheck(funko);
      res.send(funko);
    } catch (error) {
      next(error);
    }
  });
