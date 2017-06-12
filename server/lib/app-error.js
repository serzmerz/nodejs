const Terror = require('terror');

module.exports = Terror
    .setLogger(function(message, level) {
        // Используем указанный уровень логирования, если он поддерживается 'console'
        level = (typeof level === 'string') && level.toLowerCase();

        if (level !== 'count') {
            if (! level || [ 'error', 'warn', 'info' ].indexOf(level) === -1) {
                level = 'error';
            }

            console[level](message); // eslint-disable-line no-console
        }
    })
    .create('AppError', {
        REQUEST_UNAUTHORIZED: 'User is not authorized',
        MODULE_REQUIRE_ERROR: 'Error require модулей',
        REQUIRED_REDIRECT: 'Redirect to %location% (%reason%)'
    });
