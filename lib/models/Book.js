const pool = require('../utils/pool.js');

module.exports = class Book {
  id;
  title;
  author;
  cover;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.cover = row.cover;
  }

  static async insert({ title, author, cover }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, author, cover) VALUES ($1, $2, $3) RETURNING *',
      [title, author, cover]
    );
    return new Book(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }

  static async updateById(id, attributes) {
    const classicBook = await Book.getById(id);
    if (!classicBook) return null;

    const title = attributes.title ?? classicBook.title;
    const author = attributes.author ?? classicBook.author;
    const cover = attributes.cover ?? classicBook.cover;

    const { rows } = await pool.query(
      'UPDATE books set title=$1, author=$2, cover=$3 WHERE id=$4 RETURNING *',
      [title, author, cover, id]
    );
    return new Book(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM books WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) return null;

    return new Book(rows[0]);
  }
};
