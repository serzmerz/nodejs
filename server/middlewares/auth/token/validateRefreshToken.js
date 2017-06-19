const UserModel = require('../../../models/user');

module.exports = function validateRefreshToken(req, res, next) {
    /* db.client.findUserOfToken(req.body, function(err, user) {
     if (err) {
     return next(err);
     }*/

    UserModel.findOne({ where: req.body }).then(user => {
        if (! user) {
            res.json({ respond: 'refreshToken not found!' });
        }
        req.user = user;
        next();
    }).catch(function(err) {
        console.log('Error:', err);
        next(err);
    });

    // });
};
