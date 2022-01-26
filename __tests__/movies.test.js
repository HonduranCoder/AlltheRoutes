const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a movie', async () => {
    const res = await request(app).post('/api/v1/movies').send({
      company: 'Disney',
      title: 'Encanto',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      company: 'Disney',
      title: 'Encanto',
    });
  });

  it('should get a movie by id', async () => {
    const movie = await Movie.insert({
      company: 'Disney',
      title: 'Raya and the Last Dragon',
    });
    const res = await request(app).get('/api/v1/movies/1');
    expect(res.body).toEqual(movie);
  });

  it('should list all of the movies', async () => {
    const movie4 = await Movie.insert({
      company: 'DreamWorks',
      title: 'Movie4',
    });
    const movie5 = await Movie.insert({
      company: 'DreamWorks',
      title: 'Movie5',
    });
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toEqual([movie4, movie5]);
  });
  it('should update a movie by id', async () => {
    const movie = await Movie.insert({
      company: 'Pixar',
      title: 'Frozen',
    });
    const res = await request(app)
      .patch('/api/v1/movies/1')
      .send({ company: 'Disney' });

    expect(res.body).toEqual({
      ...movie,
      company: 'Disney',
    });
  });

  it('should delete a movie by id', async () => {
    const noMovie = await Movie.insert({
      company: 'ReelFX',
      title: 'Book of Life',
    });
    const res = await request(app).delete(`/api/v1/movies/${noMovie.id}`);
    expect(res.body).toEqual(noMovie);
    expect(await Movie.getById(noMovie.id)).toBeNull();
  });
});
