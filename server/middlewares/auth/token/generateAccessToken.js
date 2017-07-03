const jwt = require('jsonwebtoken');

const CONSTANTS = require('../../../constants');
const SECRET = CONSTANTS.SECRET;
const TOKENTIME = CONSTANTS.TOKENTIME;

module.exports = function generateToken(req, res, next) {
    const token = jwt.sign({
        id: req.user.id
    }, SECRET, {
        expiresIn: TOKENTIME
    });
    const UserModel = require('../../../models/user');

    UserModel.update({ accessToken: token }, { where: { id: req.user.id }, returning: true })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            res.json({
                response: {
                    success: false,
                    errors: err
                }
            });
        });
    req.token = {
        accessToken: token
    };
    next();
};
