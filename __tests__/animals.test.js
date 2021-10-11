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
        speciesId: '1',
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
                    species: expect.any(Object),
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
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) },
                    { id: expect.any(String), name: expect.any(String), species: expect.any(Object) }
                ]);
            });
    });

    it('updates an Animal by id', async () => {
        const entry = await Animals.create(animal);
        const updateEntry = {
            id: entry.id,
            speciesId: entry.speciesId,
            species: entry.species,
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

    xit('counts animals by species', () => {
        return request(app)
            .get('/api/animals/counts')
            .then((res) => {
                expect(res.body).toEqual([
                    { type: 'birds', count: '3' }, 
                    { type: 'fish', count: '3' },
                    { type: 'mammals', count: '3' },
                    { type: 'reptiles', count: '3' },
                    { type: 'dinosaurs', count: '3' }
                ]);
            });
    });
    
    afterAll(() => {
        pool.end();
    });
});
