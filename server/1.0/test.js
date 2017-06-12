const express = require('express');
const httpCodes = require('http-status-codes');

const Test = require('../models/test');

const orderRouter = new express.Router();

orderRouter
    .get('/:id', function(req, res) {
        const id = req.params.id;

        Test.find(id)
            .then(item => {
                res.json({ response: { order: item } });
            })
            .catch(err => {
                res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST }));
            });
    });

module.exports = orderRouter;
