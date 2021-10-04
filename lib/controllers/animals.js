import { Router } from 'express';
//const Material = require('../models/Material.js');
import Animals from '../models/Animals.js';

export default Router()
    .post('/', async (req, res, next) => {
        console.log(req.body);
        try {
            const entry = await Animals.create(req.body);
            res.send(entry);
        } catch (err) {
            next(err);
        }
    })
;
