import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('routes for animals table', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const animal = {
        species_id: '1',
        name: 'crow',
        size: 'medium'
    };

    it('POSTS a new animal', () => {
        return request(app)
            .post('/api/animals')
            .send(animal)
            .then((res) => {
                expect(res.body).toEqual({
                    id: '1',
                    ...animal,
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
