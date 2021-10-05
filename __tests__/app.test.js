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

    it('is a Route to add a new Animal ', () => {
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

    it('is a Route to get an Animal by id', async () => {
        const entry = await animal.create(animal);
        
        return request(app)
            .get('/api/animals')
            .then((res) => {
                expect(res.body).toEqual(entry);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
