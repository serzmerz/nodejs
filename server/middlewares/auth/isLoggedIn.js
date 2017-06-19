
module.exports = function isLoggedIn(req, res, next) {
    const UserModel = require('../../models/user');

    UserModel.findOne({ where: { id: req.user.id } }).then(user => {
        const token = 'Bearer ' + user.accessToken;

        if (token === req.headers.authorization) {
            req.user.username = user.username;
            return next();
        } res.json({ response: 'not authorized' });
    })
        .catch(err => {
            console.log(err);
            return next();
        });

 //   res.json({ response: 'not logged' });
};
