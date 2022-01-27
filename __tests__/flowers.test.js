const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Flower = require('../lib/models/Flower.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a flower', async () => {
    const res = await request(app).post('/api/v1/flowers').send({
      name: 'Daisy',
      center: 'Yellow',
      petals: 'White',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Daisy',
      center: 'Yellow',
      petals: 'White',
    });
  });

  it('should get a flower by id', async () => {
    const flower = await Flower.insert({
      name: 'Dahlia',
      center: 'Pink',
      petals: 'Yellow',
    });
    const res = await request(app).get('/api/v1/flowers/1');
    expect(res.body).toEqual(flower);
  });

  it('should list all of the flowers', async () => {
    const flower4 = await Flower.insert({
      name: 'Sunflower',
      center: 'Brown',
      petals: 'Yellow',
    });
    const flower5 = await Flower.insert({
      name: 'Rose',
      center: 'Red',
      petals: 'Red',
    });
    const res = await request(app).get('/api/v1/flowers');
    expect(res.body).toEqual([flower4, flower5]);
  });

  it('should update a flower by id', async () => {
    const flower = await Flower.insert({
      name: 'Anemones Flower',
      center: 'Red',
      petals: 'White',
    });
    const res = await request(app)
      .patch('/api/v1/flowers/1')
      .send({ center: 'Black' });

    expect(res.body).toEqual({
      ...flower,
      center: 'Black',
    });
  });

  it('should delete a flower by id', async () => {
    const notAFlower = await Flower.insert({
      name: 'Strawberry',
      center: 'White',
      petals: 'Red',
    });
    const res = await request(app).delete(`/api/v1/flowers/${notAFlower.id}`);
    expect(res.body).toEqual(notAFlower);
    expect(await Flower.getById(notAFlower.id)).toBeNull();
  });
});
