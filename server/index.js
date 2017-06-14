'use strict';

require('use-strict');

// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');

// const redirects = require('./middlewares/redirects');
// const AppError = require('./libs/app-error');

const port = process.env.port;
const server = express();

server.set('trust proxy', true);
server.disable('x-powered-by');

server.use((req, res, next) => {
    req.lang = 'ru';
    req.config = config.get();

    next();
});

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/1.0', require('./1.0'));

server.use((error, req, res, next) => {
    // Обрабатываем ошибки-редиректы
    const env = config.get('env');

    if (error) {
        if (env === 'local' || env === 'development') {
            // В деве выводим стек прямо на страницу
            res
                .status(503)
                .header('Content-Type', 'text/html; charset=utf-8')
                .send(`<pre>${error}</pre>`);
        } else {
            // Этот код обрабатывается в nginx-конфиге и заменяется на 503
            // Пользователю будет отдана статическая страница с ошибкой "сервис временно недоступен"
            res.status(520).end();
        }
    }
    next();
});

/* авторизация в battle.net */
const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;
const BNET_ID = 'tbwpuwyj94v74gn7aqbj8jq7hn5n9rf2';
const BNET_SECRET = 'aJYaGUadNjX9QKarfgShyfGJcV7r69T9';

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: 'https://localhost:3001/auth/bnet/callback',
    region: 'us'
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

server.get('/auth/bnet',
    passport.authenticate('bnet'));

server.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });
/* end battle.net */
server.listen(port, () => {
    console.log('The server is running at port ' + port); // eslint-disable-line no-console
});
