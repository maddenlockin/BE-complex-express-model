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
;
