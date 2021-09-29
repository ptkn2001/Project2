const router = require('express').Router();
const { Contributor } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    try {
        //first check to see if the contributor already contribute to this project.
        let contributorData = await Contributor.findOne({
            where: {
                name: req.body.name,
                project_id: req.body.project_id,
            }
        })

        //if the contributor already contributed to the project, we just add the new contribution to the total amount.
        //else we create a new contributor record.
        if (contributorData) {
            const currentContributor = contributorData.get({ plain: true });
            const contributorId = currentContributor.id;
            const currentAmount = currentContributor.amount;
            const newAmount = parseInt(currentAmount) + parseInt(req.body.amount);

            contributorData = await Contributor.update({
                amount: newAmount,
            }, {
                where: {
                    id: contributorId,
                },
            });
            res.status(204).json({ contributorData });
        } else {
            contributorData = await Contributor.create({
                name: req.body.name,
                project_id: req.body.project_id,
                amount: req.body.amount,
            });
            res.status(200).json(contributorData);
        }
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

module.exports = router;