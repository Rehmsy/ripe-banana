const router = require('express').Router();
const Actor = require('../models/actor');
const { HttpError } = require('../util/errors');

const make404 = id => new HttpError({
    code: 404,
    message: `No Actor With id ${id}`
});

module.exports = router
    .get('/', (req, res, next) => {
        Actor.find()
            .lean()
            .then(actors => res.json(actors))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor.findById(req.params.id)
            .lean()
            .then(actor => {
                if(!actor) {
                    next(make404(req.params.id));
                }
                else {
                    res.json(actor);
                }
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        Actor.create(req.body)
            .then(actor => res.json(actor))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Actor.findByIdAndRemove(req.params.id)
            .then(actor => res.json({ removed: !!actor }))
            .catch(next);
    });



    