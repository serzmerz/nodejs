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

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

server.use('/', require('./1.0'));

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

const app = server.listen(port, () => {
    console.log('The server is running at port ' + port); // eslint-disable-line no-console
});

const io = require('socket.io')(app);

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});
