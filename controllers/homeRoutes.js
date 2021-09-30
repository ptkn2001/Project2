const router = require('express').Router();
const { Project } = require('../models');
const withAuth = require('../utils/auth');

//Working items
router.get('/', (req, res) => {
    console.log(req.session.user_name);
    res.render('homepage', {
        logged_in: req.session.logged_in,
        user_name: req.session.user_name
    });

});

router.get('/activeprojects', async(req, res) => {
    try {
        const projectData = await Project.findAll();

        const projects = projectData.map((project) => project.get({ plain: true }));

        console.log(projects);

        res.render('activeprojects', {
            projects,
            logged_in: req.session.logged_in,
            user_name: req.session.user_name
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/myprojects', withAuth, async(req, res) => {
    try {
        const projectData = await Project.findAll({
            where: {
                organizer_id: req.session.user_id,
            },
        });

        const projects = projectData.map((project) => project.get({ plain: true }));

        res.render('myprojects', {
            projects,
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