const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    try {

        const taskData = await Task.create({
            name: req.body.name,
            project_id: req.body.project_id,
        });

        res.status(200).json(taskData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;