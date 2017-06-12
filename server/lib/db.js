/* const { MongoClient } = require('mongodb');

const config = require('../config');

module.exports = MongoClient.connect(config.get('database.url')); */
// noinspection JSAnnotator
// const pgp = require('pg-promise')(/*options*/);
const Seq = require('sequelize');
const config = require('../config');

// module.exports = pgp(config.get('database.url'));
module.exports = new Seq(config.get('database.url'));
