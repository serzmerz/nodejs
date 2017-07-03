const express = require('express');
const AuthRouter = new express.Router();
const CONSTANTS = require('../constants');
const SECRET = CONSTANTS.SECRET;

const serialize = require('../middlewares/auth/serialize/serializeUser');
const generateAccessToken = require('../middlewares/auth/token/generateAccessToken');
const respond = require('../middlewares/auth/respond/respondAuth');
const isLogin = require('../middlewares/auth/isLoggedIn');
const serializeClient = require('../middlewares/auth/serialize/serializeClient');
const generateRefreshToken = require('../middlewares/auth/token/generateRefreshToken');
const validateRefreshToken = require('../middlewares/auth/token/validateRefreshToken');
// const respondToken = require('../middlewares/auth/respond/respondToken');
const rejectToken = require('../middlewares/auth/token/rejectToken');
const respondReject = require('../middlewares/auth/respond/respondReject');
const verify = require('../middlewares/auth/verify');
const passport = require('../auth');

/* AuthRouter.options('/', function(req, res) {
    res.header({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true'
    }).send(200);
});
*/
AuthRouter.post('/', passport.initialize(), passport.authenticate(
    'local', {
        session: false
    }), serialize, serializeClient, generateAccessToken, generateRefreshToken, respond);
const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret: SECRET });

AuthRouter.get('/me', authenticate, verify, function(req, res) {
    res.status(200).json(req.user);
});

// получаем accessToken с помощью refreshToken который не обновляеться
// AuthRouter.post('/token', validateRefreshToken, generateAccessToken, respondToken);

// получаем accessToken,refreshToken  с помощью refreshToken
AuthRouter.post('/token', validateRefreshToken, serializeClient, generateAccessToken,
generateRefreshToken, respond);

AuthRouter.post('/token/reject', rejectToken, respondReject);
/* my testing routes*/
AuthRouter.get('/melog', authenticate, isLogin, function(req, res) {
    res.status(200).json(req.user);
});
AuthRouter.post('/signup', passport.authenticate('signup', {
    session: false
}), function(req, res) {
    console.log(req);
    res.status(200).json(req.user);
});
/* авторизация в battle.net */
const BnetStrategy = require('passport-bnet').Strategy;
const BNET_ID = 'tbwpuwyj94v74gn7aqbj8jq7hn5n9rf2';
const BNET_SECRET = 'aJYaGUadNjX9QKarfgShyfGJcV7r69T9';

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    // callbackURL: 'http://fastbattle.com:3000/auth/bnet/callback',
    callbackURL: 'https://localhost:3000/auth/bnet/callback',
    region: 'us'
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

AuthRouter.get('/auth/bnet',
    passport.authenticate('bnet'));

AuthRouter.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });
/* end battle.net */

module.exports = AuthRouter;
