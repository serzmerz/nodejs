
const pg = require('../lib/db');

class Test {

    static find(id) {
        return pg.any('SELECT * FROM category WHERE id = $1', id);
    }
}

module.exports = Test;
