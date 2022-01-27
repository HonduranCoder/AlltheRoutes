const pool = require('../utils/pool.js');

module.exports = class Funko {
  id;
  name;
  association;
  hair;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.association = row.association;
    this.hair = row.hair;
  }

  static async insert({ name, association, hair }) {
    const { rows } = await pool.query(
      'INSERT INTO funkos (name, association, hair) VALUES ($1, $2, $3) RETURNING *',
      [name, association, hair]
    );
    return new Funko(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM funkos WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Funko(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM funkos');
    return rows.map((row) => new Funko(row));
  }

  static async updateById(id, attributes) {
    const classicFunko = await Funko.getById(id);
    if (!classicFunko) return null;

    const name = attributes.name ?? classicFunko.name;
    const association = attributes.association ?? classicFunko.association;
    const hair = attributes.hair ?? classicFunko.hair;

    const { rows } = await pool.query(
      'UPDATE funkos set name=$1, association=$2, hair=$3 WHERE id=$4 RETURNING *',
      [name, association, hair, id]
    );
    return new Funko(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM funkos WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) return null;

    return new Funko(rows[0]);
  }
};
