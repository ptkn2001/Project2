const router = require('express').Router();
const { Contributor } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    try {
        const contributorData = await Contributor.create({
            name: req.body.name,
            project_id: req.body.project_id,
            amount: req.body.amount,
        });

        res.status(200).json(contributorData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;