const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    try {
        //project has two many variations so we don't check for the existent of the project before adding.
        //if somehow the user mistakenly create a new project, she/he can delete it easisy from the site.
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

router.delete('/:id', withAuth, async(req, res) => {
    try {
        await Project.destroy({
            where: {
                id: req.params.id,
                //We are making sure that the person that requests to delete the project is the project's owner.
                organizer_id: req.session.user_id,
            },
        });

        res.status(200).json({ message: 'sucess' });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;