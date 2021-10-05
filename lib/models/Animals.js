import pool from '../utils/pool.js';

export default class Animals {
    id;
    species_id;
    name;
    size;

    constructor(row) {
        this.id = row.id;
        this.species_id = row.species_id;
        this.name = row.name;
        this.size = row.size;
    }

    static async create({ species_id, name, size }) {
        const { rows } = await pool.query(
            'INSERT INTO animals (species_id, name, size) VALUES ($1, $2, $3) RETURNING *', [species_id, name, size]
        );

        return new Animals(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM animals WHERE id = $1', [id]
        );
        return new Animals(rows[0]);
    }
}