const UserModel = require('../../../models/user');

module.exports = function rejectToken(req, res, next) {
   // db.client.rejectToken(req.body, next);
   /* UserModel.findOne({ where: req.body }).then(user => {
        if (! user) {
            res.json({ respond: 'refreshToken not found!' });
        }
        req.user = user;
        next();
    }).catch(function(err) {
        console.log('Error:', err);
        next(err);
    });
    next();*/

    UserModel.update({ accessToken: null, refreshToken: null }, { where: req.body, returning: true })
        .then(data => {
            if (! data) {
                res.json({ respond: 'refreshToken not found!' });
            }
            req.user = data;
            next();
        })
        .catch(err => {
            console.log('Error:', err);
            next(err);
        });
};
