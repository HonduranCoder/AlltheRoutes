const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a book', async () => {
    const res = await request(app).post('/api/v1/books').send({
      title: 'Nevernight',
      author: 'Jay Kristoff',
      cover: 'Mia Corvere',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Nevernight',
      author: 'Jay Kristoff',
      cover: 'Mia Corvere',
    });
  });

  it('should get a book by id', async () => {
    const book = await Book.insert({
      title: 'Gone with the Wind',
      author: 'Margaret Mitchell',
      cover: 'Plantation',
    });
    const res = await request(app).get('/api/v1/books/1');
    expect(res.body).toEqual(book);
  });

  it('should list all of the books', async () => {
    const book4 = await Book.insert({
      title: 'Dune',
      author: 'Frank Herbert',
      cover: 'Arrakis',
    });
    const book5 = await Book.insert({
      title: 'Children of Time',
      author: 'Adrian Tchaikovsky',
      cover: 'Outerspace',
    });
    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual([book4, book5]);
  });

  it('should update a book by id', async () => {
    const book = await Book.insert({
      title: 'Gods',
      author: 'Neil Gaiman',
      cover: 'Lightning',
    });
    const res = await request(app)
      .patch('/api/v1/books/1')
      .send({ title: 'American Gods' });

    expect(res.body).toEqual({
      ...book,
      title: 'American Gods',
    });
  });

  it('should delete a book by id', async () => {
    const unknownBook = await Book.insert({
      title: 'House of Leaves',
      author: 'Mark Z. Danielewski',
      cover: 'Compass',
    });
    const res = await request(app).delete(`/api/v1/books/${unknownBook.id}`);
    expect(res.body).toEqual(unknownBook);
    expect(await Book.getById(unknownBook.id)).toBeNull();
  });
});
