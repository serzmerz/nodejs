const express = require('express');
/* const user = require('./user');
const order = require('./order');
const offer = require('./offer'); */

const test = require('./test');
const order = require('./order');

const router = new express.Router();

/* router.use('/user', user);
router.use('/order', order);
router.use('/offer', offer); */

router.use('/test', test);

router.use('/order', order);

router.get('/status', (req, res) => {
    res.json({ status: 'OK' });
});

module.exports = router;
