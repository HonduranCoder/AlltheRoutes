const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a dog', async () => {
    const res = await request(app).post('/api/v1/dogs').send({
      name: 'Mia',
      breed: 'Mixed',
      coat: 'Tan',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Mia',
      breed: 'Mixed',
      coat: 'Tan',
    });
  });

  it('should get a dog by id', async () => {
    const dog = await Dog.insert({
      name: 'Ruby',
      breed: 'Pomeranian Maybe',
      coat: 'Orange',
    });
    const res = await request(app).get('/api/v1/dogs/1');
    expect(res.body).toEqual(dog);
  });

  it('should list all of the dogs', async () => {
    const dog4 = await Dog.insert({
      name: 'Ellie',
      breed: 'Corgie',
      coat: 'Black',
    });
    const dog5 = await Dog.insert({
      name: 'Gracie',
      breed: 'Mixed',
      coat: 'Dark Tan',
    });
    const res = await request(app).get('/api/v1/dogs');
    expect(res.body).toEqual([dog4, dog5]);
  });

  it('should update a dog by id', async () => {
    const dog = await Dog.insert({
      name: 'Xena',
      breed: 'Giant',
      coat: 'Spotted',
    });
    const res = await request(app)
      .patch('/api/v1/dogs/1')
      .send({ breed: 'Great Dane' });

    expect(res.body).toEqual({
      ...dog,
      breed: 'Great Dane',
    });
  });

  it('should delete a dog by id', async () => {
    const notDog = await Dog.insert({
      name: 'Kilo',
      breed: 'Cat',
      coat: 'White',
    });
    const res = await request(app).delete(`/api/v1/dogs/${notDog.id}`);
    expect(res.body).toEqual(notDog);
    expect(await Dog.getById(notDog.id)).toBeNull();
  });
});
