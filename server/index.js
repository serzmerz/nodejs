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

server.listen(port, () => {
    console.log('The server is running at port ' + port); // eslint-disable-line no-console
});
