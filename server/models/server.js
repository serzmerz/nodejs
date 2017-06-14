
const pg = require('../lib/db');
const Sequelize = require('sequelize');
/* class Test {

    static find(id) {
        return pg.any('SELECT * FROM category WHERE id = $1', id);
    }
}
*/
const Server = pg.define('s', {
    name: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.INTEGER
    },
    updated_at: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false, tableName: 'Servers' });

/* need to create or replace table */
/* Test.sync({ force: true }).then(() => {
    // Table created
    return Test.create({
        name: 'John',
        description: 'Hancock'
    });
}); */
module.exports = Server;
