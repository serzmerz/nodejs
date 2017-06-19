const passport = require('passport');
const Strategy = require('passport-local');
const crypto = require('crypto');
// const DigestStrateg = require('passport-http').DigestStrategy;

const User = require('./models/user');
const isValidPassword = function(user, password) {
    password = crypto.createHmac('sha256', password)
        .update('hack this please')
        .digest('hex');
    return password === user.password;
};

passport.use(new Strategy(
    function(username, password, done) {
        // database dummy - find user and verify password
       /* User.findOne({ where: { username } }).then(user => {
            if (isValidPassword(user, password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch(err => {
            done(null, false);
            console.log(err);
        }
        );*/
        User.findOne({ where: { username } }).then(user => {
            if (! user) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
            if (! isValidPassword(user, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        }).catch(function(err) {
            console.log('Error:', err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }));
     /*   User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {

            if (!user) {

                return done(null, false, {
                    message: 'Email does not exist'
                });

            }

            if (!isValidPassword(user.password, password)) {

                return done(null, false, {
                    message: 'Incorrect password.'
                });

            }

            var userinfo = user.get();
            return done(null, userinfo);

        }).catch(function(err) {

            console.log("Error:", err);

            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });

        });
    }
 ));*/
/* const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(username, password, done) {
        User.findOne({ where: { username } }, function(err, user) {
            if (err) { return done(err); }
            if (! user) { return done(null, false); }
            if (! user.password === password) { return done(null, false); }
            return done(null, user);
        });
    }
));*/
        /* if (username === 'devils name' && password === '666') {
            done(null, {
                id: 666,
                firstname: 'devils',
                lastname: 'name',
                email: 'devil@he.ll',
                verified: true
            });
        } else {
            done(null, false);
        }*/
/*   */

/* passport.use(new DigestStrateg({ qop: 'auth' },
    function(username, done) {
        User.findOne({ where: { username: username } }, function(err, user) {
            if (err) { return done(err); }
            if (! user) { return done(null, false); }
            return done(null, user, user.password);
        });
    },
    function(params, done) {
        // validate nonces as necessary
        done(null, true);
    }
));*/

module.exports = passport;
