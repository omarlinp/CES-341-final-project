const router = require('express').Router();
const passport = require('../helpers/auth');
const loginController = require('../controller/login');



router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', 
        { 
            successRedirect: '/login/profile',
            failureRedirect: '/login/failure' 
        }),
)

router.get('/profile',loginController.isLoggedIn, (req, res) => {
    res.send(`Welcome, ${req.user.displayName}!`);
});

router.get('/failure', (req, res) => {
    res.send('Authentication failed');
});
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {return next(err);}
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.send('Logged out successfully');
    });
});
module.exports = router;