const router = require('express').Router();
const Review = require('../models/review');
const Reviewer = require('../models/reviewer');
const Film = require('../models/film');

module.exports = router

    .get('/', (req, res, next) => {
        Review.find()
            .lean()
            .limit(100)
            .then(reviews => res.json(reviews))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {

        Promise.all([
            Review.findById(req.params.id)
                .lean(),
            Reviewer
                .find({ name: req.params.id })
                .lean()
                .select('name'),
            Film
                .find({ title: req.params.id })
                .lean()
                .select('title')
        ])
            .then(([review, reviewers]) => {
                if(!review) {
                    next(make404(req.params.id));
                }
                else {
                    review.reviewers = reviewers;
                    res.json(review);
                }
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        Review.create(req.body)
            .then(review => res.json(review))
            .catch(next);
    });
