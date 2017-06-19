const passport = require('passport');
const Strategy = require('passport-local');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
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

const createHash = function(password) {
    return crypto.createHmac('sha256', password)
        .update('hack this please')
        .digest('hex');
};

passport.use('signup', new LocalStrategy({
    // allows us to pass back the entire request to the callback
    passReqToCallback: true
},
    function(req, username, password, done) {
        const findOrCreateUser = function() {
            // find a user in Mongo with provided username
            User.findOne({ where: { username } }).then(user => {
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false, { message: 'User Already Exists' });
                }
                User.create({ username, password: createHash(password) }).then(data => {
                    console.log('User Registration successful!');
                    return done(null, data);
                })
                    .catch(err => {
                        console.log('Error in Saving user: ' + err);
                        return done(err);
                        /* res.status(httpCodes.BAD_REQUEST)
                         .json(Object.assign(err, { status: httpCodes.BAD_REQUEST })); */
                    });
            }).catch(function(err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            });
          /*  User.findOne({ username }, function(err, user) {
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false, req.flash('message', 'User Already Exists'));
                }
                    // if there is no user with that email
                    // create the user
                const newUser = new User();

                    // set the user's local credentials
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.email = req.param('email');
                newUser.firstName = req.param('firstName');
                newUser.lastName = req.param('lastName');

                    // save the user
                newUser.save(function(err) {
                    if (err) {
                        console.log('Error in Saving user: ' + err);
                        throw err;
                    }
                    console.log('User Registration succesful');
                    return done(null, newUser);
                });
            });*/
        };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop

        process.nextTick(findOrCreateUser);
    })
);

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
