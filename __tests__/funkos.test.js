const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Funko = require('../lib/models/Funko.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a funko', async () => {
    const res = await request(app).post('/api/v1/funkos').send({
      name: 'Aggretsuko',
      association: 'Netflix',
      hair: 'Orange',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Aggretsuko',
      association: 'Netflix',
      hair: 'Orange',
    });
  });

  it('should get a funko by id', async () => {
    const funko = await Funko.insert({
      name: 'Wonder Woman',
      association: 'DC',
      hair: 'Black',
    });
    const res = await request(app).get('/api/v1/funkos/1');
    expect(res.body).toEqual(funko);
  });

  it('should list all of the funkos', async () => {
    const funko4 = await Funko.insert({
      name: 'Winnie the Pooh',
      association: 'Disney',
      hair: 'N/A',
    });
    const funko5 = await Funko.insert({
      name: 'Eeyore',
      association: 'Disney',
      hair: 'Black',
    });
    const res = await request(app).get('/api/v1/funkos');
    expect(res.body).toEqual([funko4, funko5]);
  });

  it('should update a funko by id', async () => {
    const funko = await Funko.insert({
      name: 'Harley Quinn',
      association: 'Marvel',
      hair: 'Blonde',
    });
    const res = await request(app)
      .patch('/api/v1/funkos/1')
      .send({ association: 'DC' });

    expect(res.body).toEqual({
      ...funko,
      association: 'DC',
    });
  });

  it('should delete a funko by id', async () => {
    const noFunko = await Funko.insert({
      name: 'Cheshire Cat',
      association: 'Alice in Wonderland',
      hair: 'Striped',
    });
    const res = await request(app).delete(`/api/v1/funkos/${noFunko.id}`);
    expect(res.body).toEqual(noFunko);
    expect(await Funko.getById(noFunko.id)).toBeNull();
  });
});
