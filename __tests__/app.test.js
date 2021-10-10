import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Animals from '../lib/models/Animals.js';
import animals from '../lib/controllers/animals.js';

describe('routes for animals table', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const animal = {
        species_id: '1',
        name: 'mourning dove',
        size: 'small'
    };

    it('is a Route to add a new Animal ', () => {
        return request(app)
            .post('/api/animals')
            .send(animal)
            .then((res) => {
                expect(res.body).toEqual({
                    id: '16',
                    ...animal,
                });
            });
    });

    it('is a Route to get an Animal by id', async () => {
        const entry = await Animals.create(animal);
        
        return request(app)
            .get('/api/animals/16')
            .then((res) => {
                expect(res.body).toEqual(entry);
            });
    });

    it('is a route to get all Animals with their Species', () => {
        return request(app)
            .get('/api/animals')
            .then((res) => {
                expect (res.body).toEqual([
                    { id: expect.any(Number), species: expect.any(Object), name: expect.any(String) },
                ]);
            });
    });

    it('updates an Animal by id', async () => {
        const entry = await Animals.create(animal);
        const updateEntry = {
            id: entry.id,
            species_id: entry.species_id,
            name: entry.name,
            size: 'small',
        };
        return request(app)
            .patch(`/api/animals/${entry.id}`)
            .send(updateEntry)
            .then((res) => {
                expect(res.body).toEqual(updateEntry);
            });
    });

    it('deletes an Animal by id', async () => {
        const entry = await Animals.create(animal);

        return request(app)
            .delete(`/api/animals/${entry.id}`)
            .then((res) => {expect(res.body).toEqual({});
            });
    });
    
    afterAll(() => {
        pool.end();
    });
});
