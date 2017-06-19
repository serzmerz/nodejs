module.exports = function respond(req, res) {
    res.status(201).json({
        token: req.token
    });
};
