
const pg = require('../lib/db');
const Sequelize = require('sequelize');
/* class Test {

    static find(id) {
        return pg.any('SELECT * FROM category WHERE id = $1', id);
    }
}
*/
const Test = pg.define('c', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
}, { timestamps: false, tableName: 'category' });

/* Test.sync({ force: true }).then(() => {
    // Table created
    return Test.create({
        name: 'John',
        description: 'Hancock'
    });
}); */
module.exports = Test;
