import species from '../controllers/species.js';
import pool from '../utils/pool.js';

export default class Animals {
    id;
    speciesId;
    species;
    type;
    name;
    size;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.size = row.size;
        this.speciesId = row.species_id;
        this.species = {
            type: row.type
        }

    }

    static async create({ speciesId, name, size }) {
        const { rows } = await pool.query(
            'INSERT INTO animals (species_id, name, size) VALUES ($1, $2, $3) RETURNING *', [speciesId, name, size]
        );

        return new Animals(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM animals WHERE id = $1', [id]
        );
        return new Animals(rows[0]);
    }

    static async getAllAnimals() {
        const { rows } = await pool.query(
            `SELECT animals.id, animals.name, species.type 
            FROM animals
            INNER JOIN species
            ON species.id = animals.species_id`
            );
        return await rows.map((row) => new Animals(row));
    }

    static async updateEntry(id, speciesId, name, size) {
        const { rows } = await pool.query(
            'UPDATE animals SET species_id=$2, name=$3, size=$4 WHERE id=$1 RETURNING *', [id, speciesId, name, size]
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

    static async countAnimals() {
        const { rows } = await pool.query(
            `SELECT species.type,
            COUNT(species_id) 
            FROM animals 
            INNER JOIN species
            ON species.id = animals.species_id 
            GROUP BY GROUPING SETS(species.type)`
        );
        return rows;
    }
};
