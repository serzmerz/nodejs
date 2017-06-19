
module.exports = function serialize(req, res, next) {
        // we store the updated information in req.user again
    req.user = {
        id: req.user.id
    };
    next();
};

