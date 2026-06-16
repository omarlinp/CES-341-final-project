const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const test = require('./test');

dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://ces-341-final-project.onrender.com/login/google/callback',
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
        const id = await test.find(profile.id);
        console.log(id);
        if(!id) {
            await test.create(profile);
        }
   


        return done(null, profile);
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;