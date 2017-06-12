const express = require('express');
// const httpCodes = require('http-status-codes');

const Test = require('../models/test');

const orderRouter = new express.Router();

orderRouter
    .get('/', function(req, res) {
        // const id = req.params.id;

        /* Test.find(id)
            .then(item => {
                res.json({ response: { order: item } });
            })
            .catch(err => {
                res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST }));
            }); */
        Test.findAll().then(users => {
            res.json({ response: { order: users } });
        })
            .catch(err => {
                res.json({ response: err });
            });
    });

module.exports = orderRouter;
