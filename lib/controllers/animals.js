import { Router } from 'express';
//const Material = require('../models/Material.js');
import Animals from '../models/Animals.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Animals.create(req.body);
            res.send(entry);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const item = await Animals.getById(id);
            res.send(item);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const allAnimals = await Animals.getAllAnimals();
            res.send(allAnimals);
        } catch(err) {
            next(err);
        }
    })

    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const update = await Animals.updateEntry(id, req.body.speciesId, req.body.name, req.body.size);
            res.send(update);
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const deleted = await Animals.deleteEntry(id);
            res.send(deleted);
        } catch (err) {
            next(err);
        }
    })

    .get('/counts', async (req, res, next) => {
        try {
            const count = await Animals.countAnimals();
            res.json(count);
        } catch(err) {
            next(err);
        }
    })
;
