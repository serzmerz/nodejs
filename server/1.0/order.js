const express = require('express');
const httpCodes = require('http-status-codes');

const Order = require('../models/order');

const orderRouter = new express.Router();

orderRouter
    .get('/:id', function(req, res) {
        const id = req.params.id;
        const order = new Order();

        order.find(id)
            .then(item => {
                res.json({ response: { order: item } });
            })
            .catch(err => {
                res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST }));
            });
    })
    .post('/', function(req, res) {
        const orderModel = new Order();
        const { order = {} } = req.body;

        order.userId = req.userObj._id;
        orderModel.create(order)
            .then(() => {
                res.json({ response: { status: 'OK' } });
            })
            .catch(err => {
                res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST }));
            });
    })
    .put('/:id', function(req, res) {
        const id = req.params.id;
        const orderModel = new Order();
        const { order = {} } = req.body;

        order.userId = req.userObj._id;

        orderModel.update(order, id)
            .then(item => {
                res.json({ response: { order: item } });
            })
            .catch(err => {
                res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST }));
            });
    })
    .delete('/:id', function(req, res) {
        const orderModel = new Order();
        const id = req.params.id;

        orderModel.destroy(id)
            .then(item => {
                res.json({ removed: { order: item } });
            })
            .catch(err => {
                res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST }));
            });
    });

module.exports = orderRouter;
