/* const { MongoClient } = require('mongodb');

const config = require('../config');

module.exports = MongoClient.connect(config.get('database.url')); */
// noinspection JSAnnotator
const pgp = require('pg-promise')(/*options*/);

const config = require('../config');

module.exports = pgp(config.get('database.url'));
