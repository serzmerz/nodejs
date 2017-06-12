const JsonValidator = require('../lib/json-validator');
const mongo = require('../lib/db');
const ObjectID = require('mongodb').ObjectID;

const jsonValidator = new JsonValidator('ru');

jsonValidator
    .addSchema(require('../../common/schemas/orderSchema.json'));

class Order {
    constructor(collection = 'orders') {
        this._collection = collection;
    }

    find(id) {
        const details = { _id: new ObjectID(id) };

        return mongo.then(db =>
            db.collection(this._collection).findOne(details));
    }

    update(body, id) {
        const details = { _id: new ObjectID(id) };

        return this.validation(body)
            .then(() =>
                mongo.then(db =>
                    db.collection(this._collection).updateOne(details, body)));
    }

    destroy(id) {
        const details = { _id: new ObjectID(id) };

        return mongo.then(db =>
            db.collection(this._collection).deleteOne(details));
    }

    create(body, opts = {}) {
        return this.validation(body)
            .then(() =>
                mongo.then(db =>
                    db.collection(this._collection).insert(body, opts)));
    }

    validation(body) {
        return new Promise((resolve, reject) => {
            const validationErrors = jsonValidator.validate(body, 'order');

            if (! validationErrors.valid) {
                reject({
                    valid: false,
                    validationErrors: jsonValidator.localizedErrors(validationErrors.errors)
                });
            }

            resolve();
        });
    }
}

module.exports = Order;
