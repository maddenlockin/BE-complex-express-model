import pool from '../utils/pool.js';

export default class Species {
    id;
    type;
    extinct;

    constructor(row) {
        this.id = row.id;
        this.type = row.type;
        this.extinct = row.extinct
    }

    static async create({ type, extinct }) {
        const { rows } = await pool.query(
            'INSERT INTO species (type, extinct) VALUES ($1, $2) RETURNING *', [type, extinct]
        );
        return new Species(rows[0]);
    }

    static async getAllSpecies() {
        const { rows } = await pool.query('SELECT * from species');

        return rows.map((row) => new Species(row));
    }

    static async update(id, extinct){
        const { rows } = await pool.query(
            'UPDATE species SET extinct = $2 WHERE id = $1 RETURNING *' [id, extinct]
        );
        return new Species(rows[0]);
    }
}
