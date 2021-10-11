import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Species from '../lib/models/Species.js';

describe('routes for species table', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const newSpecies = {
        type: 'plants',
        extinct: false
    };

    it('is a Route to add a new Species', () => {
        return request(app)
            .post('/api/species')
            .send(newSpecies)
            .then((res) => {
                expect(res.body).toEqual({
                    id: '6',
                    ...newSpecies 
                });
            });
    });

    it('Gets all species', () => {
        return request(app)
            .get('/api/species')
            .then((res) => {
                expect(res.body).toEqual([
                    { type: 'birds', extinct: false, id: '1' },
                    { type: 'fish', extinct: false, id: '2' },
                    { type: 'mammals', extinct: false, id: '3' },
                    { type: 'reptiles', extinct: false, id: '4' },
                    { type: 'dinosaurs', extinct: true, id: '5' }
                ]);
            });
    });

    xit('updates species extinction data', async() => {
        const entry = await Species.create(newSpecies);
        const updateEntry = {
            id: entry.id,
            type: entry.type,
            extinct: 'true',
        };
        return request(app)
            .patch(`/api/species/${entry.id}`)
            .send(updateEntry)
            .then((res) => {
                expect(res.body).toEqual({ updateEntry });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
