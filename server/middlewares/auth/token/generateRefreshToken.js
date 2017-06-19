const crypto = require('crypto');

module.exports = function generateRefreshToken(req, res, next) {
    if (req.query.permanent === 'true') {
        const token = req.user.clientId.toString() + '.' + crypto.randomBytes(
                40).toString('hex');
        /* db.client.storeToken({
            id: req.user.clientId,
            refreshToken: req.token.refreshToken
        }, next);*/
        const UserModel = require('../../../models/user');

        UserModel.update({ refreshToken: token }, { where: { id: req.user.clientId }, returning: true })
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
        req.token.refreshToken = token;
        next();
    } else {
        next();
    }
};

