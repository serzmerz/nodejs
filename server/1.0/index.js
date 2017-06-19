const express = require('express');
/* const user = require('./user');
const order = require('./order');
const offer = require('./offer'); */

const test = require('./test');
const server = require('./server');
const user = require('./user');
const auth = require('./auth');

const router = new express.Router();
/* router.use('/user', user);
router.use('/order', order);
router.use('/offer', offer); */

router.use('/test', test);
router.use('/server', server);
router.use('/user', user);
router.use('/auth', auth);

router.get('/status', (req, res) => {
    res.json({ status: 'OK' });
});

module.exports = router;
