import pool from '../utils/pool.js';

export default class Species {
    id;
    type;
    extinct;

    constructor(row) {
        this.id = row.id;
        this.type = row.type;
        this.extinct = row.extinct;
}
