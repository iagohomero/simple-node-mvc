const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDao = require('../app/infra/user-dao');
const db = require('./database');

module.exports = (app) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const userDao = new UserDao(db);
            userDao.findByEmail(email)
                        .then(user => {
                            if (!user || password != user.password) {
                                return done(null, false, {
                                    msg: 'Wrong password!'
                                });
                            }
                            return done(null, user);
                        })
                        .catch(error => done(error, false));
        }
    ));

    passport.serializeUser((user, done) => {
        const userSession = {
            name: user.name,
            email: user.email
        };
        done(null, userSession);
    })

    passport.deserializeUser((userSession, done) => {
        done(null, userSession);
    })

    app.use(session({
        secret: 'node',
        genid: req => {
            return uuid();
        },
        resave: false,
        saveUninitialized: false,
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, resp, next) => {
        req.passport = passport;
        next();
    })
};