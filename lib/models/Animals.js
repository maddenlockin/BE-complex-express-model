import pool from '../utils/pool.js';

export default class Animals {
    id;
    speciesId;
    species;
    name;
    size;

    constructor(row) {
        this.id = row.id;
        this.speciesId = row.species_id;
        this.species = {
            speciesName: row.name
        };
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

    static async updateEntry(id, species_id, name, size) {
        const { rows } = await pool.query(
            'UPDATE animals SET species_id=$2, name=$3, size=$4 WHERE id=$1 RETURNING *', [id, species_id, name, size]
        );
        return new Animals(rows[0]);
    }

    static async deleteEntry(id) {
        const { rows } = await pool.query(
            'DELETE FROM animals WHERE id=$1', 
            [id],
        );
        return rows[0];
    }
};
