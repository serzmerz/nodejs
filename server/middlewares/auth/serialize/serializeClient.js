
module.exports = function serializeClient(req, res, next) {
    if (req.query.permanent === 'true') {
       /* db.client.updateOrCreate({
            user: req.user
        }, function(err, client) {
            if (err) {
                return next(err);
            }
            */
            // we store information needed in token in req.user
        req.user.clientId = req.user.id;
        next();
    } else {
        next();
    }
        /* });
    } else {
        next();
    }*/
};
