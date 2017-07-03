// const jwt = require('jsonwebtoken');

module.exports = function verify(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ response: {
            success: false,
            error: err.message } });
    }
    next();
   /* if (resul.error) {
        // console.log(resul.error);
        res.json(resul.error);
    } else next();
*/
    /* jwt.verify(token, 'hack this please', function(err, decoded) {
  console.log(decoded.foo) // bar
});*/
  //  next();
};
