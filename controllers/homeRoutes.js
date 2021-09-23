const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log(req.session.user_name);
    res.render('homepage', {
        logged_in: req.session.logged_in,
        user_name: req.session.user_name
    });

});

router.get('/activeprojects', (req, res) => {
    try {
        res.render('activeprojects', {
            logged_in: req.session.logged_in,
            user_name: req.session.user_name
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/myprojects', withAuth, (req, res) => {
    try {
        res.render('myprojects', {
            logged_in: req.session.logged_in,
            user_name: req.session.user_name
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => res.render('signup'));

module.exports = router;