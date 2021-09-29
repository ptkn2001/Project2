const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    try {
        //first we check to see if the same task existed in the database.
        let taskData = await Task.findOne({
            where: {
                name: req.body.name,
                project_id: req.body.project_id,
            }
        })

        //if the task does not exist, we create a new task.
        if (!taskData) {
            taskData = await Task.create({
                name: req.body.name,
                project_id: req.body.project_id,
            });
            res.status(200).json(taskData);
        } else {
            res.status(204).json(taskData);
        }
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;