import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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

    xit('Gets all species', () => {
        return request(app)
            .get('/api/species')
            .then((res) => {
                console.log(res.body.type);
                expect(res.body.type).toEqual([
                    { type: 'birds' },
                    { type: 'fish' },
                    { type: 'mammals' },
                    { type: 'reptiles' }
                ]);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
