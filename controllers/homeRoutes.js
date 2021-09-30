const router = require('express').Router();
const { User, Project, Task, Contributor } = require('../models');
const withAuth = require('../utils/auth');

//this route renders the home page for the site.
router.get('/', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,
        user_name: req.session.user_name
    });

});

//this route renders all the projects in the database regardless if the user login or not.
router.get('/activeprojects', async(req, res) => {
    try {
        const projectData = await Project.findAll({
            order: [
                ['event_date', 'ASC']
            ],
        });

        const projects = projectData.map((project) => project.get({ plain: true }));

        res.render('activeprojects', {
            projects,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            user_name: req.session.user_name,
            user_email: req.session.user_email
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//this routes renders all the projects belong to the logged in user.
router.get('/myprojects', withAuth, async(req, res) => {
    try {
        const projectData = await Project.findAll({
            where: {
                organizer_id: req.session.user_id,
            },
            order: [
                ['event_date', 'ASC']
            ],
        });

        const projects = projectData.map((project) => project.get({ plain: true }));

        res.render('myprojects', {
            projects,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            user_name: req.session.user_name,
            user_email: req.session.user_email
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//this route renders the add new project form.
router.get('/addnewproject', withAuth, async(req, res) => {
    try {
        res.render('newproject', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            user_name: req.session.user_name,
            user_email: req.session.user_email
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//this route renders the project detail for a give project id.
router.get('/projectdetails/:id', async(req, res) => {
    try {

        const projectData = await Project.findByPk(req.params.id, {
            include: {
                model: User
            },
        });

        const project = projectData.get({ plain: true });

        const tasksData = await Task.findAll({
            where: { project_id: req.params.id },
        })

        let tasks = [];

        if (tasksData) {
            tasks = tasksData.map((task) => task.get({ plain: true }));
        }

        const contributorsData = await Contributor.findAll({
            where: { project_id: req.params.id },
        })

        let contributors = [];

        if (contributorsData) {
            contributors = contributorsData.map((contributor) => contributor.get({ plain: true }));
        }

        res.render('projectDetails', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            user_name: req.session.user_name,
            user_email: req.session.user_email,
            project_id: project.id,
            project_name: project.name,
            project_description: project.description,
            project_organizer_id: project.user.id,
            project_organizer: project.user.name,
            project_contact: project.user.email,
            event_type: project.event_type,
            event_fund: project.event_fund,
            event_location: project.event_location,
            tasks,
            contributors,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

//this route renders the login form.
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

//this route renders the signup form.
router.get('/signup', (req, res) => res.render('signup'));

module.exports = router;