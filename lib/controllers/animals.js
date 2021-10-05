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

;
