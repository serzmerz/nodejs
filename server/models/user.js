
const pg = require('../lib/db');
const Sequelize = require('sequelize');
/* class Test {

    static find(id) {
        return pg.any('SELECT * FROM category WHERE id = $1', id);
    }
}
*/
const User = pg.define('u', {
    id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    accessToken: {
        type: Sequelize.STRING
    },
    refreshToken: {
        type: Sequelize.STRING
    }
}, { timestamps: false, tableName: 'User' });

/* need to create or replace table */
/* User.sync({ force: true }).then(() => {
    // Table created
    return User.create({
        username: 'john',
        password: '666'
    });
});*/
module.exports = User;
