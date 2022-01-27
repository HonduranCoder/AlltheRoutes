const pool = require('../utils/pool.js');

module.exports = class Flower {
  id;
  name;
  center;
  petals;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.center = row.center;
    this.petals = row.petals;
  }

  static async insert({ name, center, petals }) {
    const { rows } = await pool.query(
      'INSERT INTO flowers (name, center, petals) VALUES ($1, $2, $3) RETURNING *',
      [name, center, petals]
    );
    return new Flower(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM flowers WHERE id=$1', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Flower(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM flowers');
    return rows.map((row) => new Flower(row));
  }

  static async updateById(id, attributes) {
    const vintageFlower = await Flower.getById(id);
    if (!vintageFlower) return null;

    const name = attributes.name ?? vintageFlower.name;
    const center = attributes.center ?? vintageFlower.center;
    const petals = attributes.petals ?? vintageFlower.petals;

    const { rows } = await pool.query(
      'UPDATE flowers set name=$1, center=$2, petals=$3 WHERE id=$4 RETURNING *',
      [name, center, petals, id]
    );
    return new Flower(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM flowers WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) return null;

    return new Flower(rows[0]);
  }
};
