const pool = require('../utils/pool.js');

module.exports = class Movie {
  id;
  title;
  company;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.company = row.company;
  }

  static async insert({ title, company }) {
    const { rows } = await pool.query(
      'INSERT INTO movies (title, company) VALUES ($1, $2) RETURNING *',
      [title, company]
    );
    return new Movie(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM movies WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM movies');
    return rows.map((row) => new Movie(row));
  }

  static async updateById(id, attributes) {
    const oldMovie = await Movie.getById(id);
    if (!oldMovie) return null;

    const title = attributes.title ?? oldMovie.title;
    const company = attributes.company ?? oldMovie.company;

    const { rows } = await pool.query(
      'UPDATE movies set title=$1, company=$2 WHERE id=$3 RETURNING *',
      [title, company, id]
    );
    return new Movie(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM movies WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) return null;

    return new Movie(rows[0]);
  }
};
