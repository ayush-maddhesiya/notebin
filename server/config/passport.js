const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'loginValue',
    passwordField: 'password'
},
    async (loginValue, password, done) => {
        try {
            const user = await User.findOne({
                $or: [
                    { email: loginValue },
                    { username: loginValue }
                ]
            });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken , refreshToken , profile , done) => {
        try {
            let user = await User.findOne({googleId: profile.id});
            if (!user){
                user = new User({
                    googleId: profile.id,
                    googleToken: accessToken,
                    email: profile.emails[0].value,
                    username: profile.displayName
                });
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
    }
}));