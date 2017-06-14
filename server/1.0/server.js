const express = require('express');

// const httpCodes = require('http-status-codes');
// const httpCodes = require('http-status-codes');

const ServerModel = require('../models/server');

const serverRouter = new express.Router();

serverRouter
    .get('/', function(req, res) {
        /* Test.find(id)
            .then(item => {
                res.json({ response: { order: item } });
            })
            .catch(err => {
                res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST }));
            }); */
        ServerModel.findAll().then(data => {
            res.json({ response: { servers: data } });
        })
            .catch(err => {
                res.json({ response: err });
            });
    })
    .get('/one/:id', function(req, res) {
        ServerModel.findById(req.params.id).then(data => {
            res.json({ response: { server: data } });
        })
        .catch(err => {
            res.json({ response: err });
        });
    })
    .post('/', function(req, res) {
        const server = req.body;

        const formated = Date.now();

        server.created_at = formated;
        server.updated_at = formated;

        ServerModel.create(server).then(data => {
            res.json({ response: { success: true,
                body: data } });
        })
            .catch(err => {
                res.json({ response: {
                    success: false,
                    errors: err
                } });
                /* res.status(httpCodes.BAD_REQUEST)
                    .json(Object.assign(err, { status: httpCodes.BAD_REQUEST })); */
            });
    })
    .put('/', function(req, res) {
        const server = req.body;

        server.data.updated_at = Date.now();

        ServerModel.update(server.data, { where: { id: server.id }, returning: true })
            .then(data => {
                res.json({
                    response: {
                        success: Boolean(Number(data[0])),
                        body: data[1].length === 0 ? 'No one row updated!' : data[1]
                    }
                });
            })
            .catch(err => {
                res.json({
                    response: {
                        success: false,
                        errors: err
                    }
                });
            });
    })
    .delete('/:id', function(req, res) {
        ServerModel.destroy({ where: { id: req.params.id } })
        .then(data => {
            res.json({ response: { success: Boolean(Number(data)) } });
        })
            .catch(err => {
                res.json({ response: err });
            });
    })
;

module.exports = serverRouter;
