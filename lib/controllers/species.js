import { Router } from 'express';
import Species from '../models/Species';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Species.create(req.body);
            res.send(entry);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const allSpecies = await Species.getAllSpecies();
            res.send(allSpecies);
        } catch (err) {
            next(err);
        }
    })

    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const newExtinct = await Species.update(id, req.body.extinct);
            res.send(newExtinct);
        } catch(err) {
            next(err);
        }
    })
;
