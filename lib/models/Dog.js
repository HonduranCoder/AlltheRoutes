const pool = require('../utils/pool.js');

module.exports = class Dog {
  id;
  name;
  breed;
  coat;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
    this.coat = row.coat;
  }

  static async insert({ name, breed, coat }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs (name, breed, coat) VALUES ($1, $2, $3) RETURNING *',
      [name, breed, coat]
    );
    return new Dog(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM dogs WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Dog(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM dogs');
    return rows.map((row) => new Dog(row));
  }

  static async updateById(id, attributes) {
    const grandparentDog = await Dog.getById(id);
    if (!grandparentDog) return null;

    const name = attributes.name ?? grandparentDog.name;
    const breed = attributes.breed ?? grandparentDog.breed;
    const coat = attributes.coat ?? grandparentDog.coat;

    const { rows } = await pool.query(
      'UPDATE dogs set name=$1, breed=$2, coat=$3 WHERE id=$4 RETURNING *',
      [name, breed, coat, id]
    );
    return new Dog(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM dogs WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) return null;

    return new Dog(rows[0]);
  }
};
