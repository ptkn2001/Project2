const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    try {

        const projectData = await Project.create({
            name: req.body.projectName,
            description: req.body.projectDescription,
            event_date: req.body.projectDate,
            event_type: req.body.eventType,
            event_fund: 0,
            organizer_id: req.session.user_id,
        });

        res.status(200).json(projectData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;