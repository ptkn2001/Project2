const router = require('express').Router();
const { User } = require('../../models');

//this route creates a new user account when the user signed up for a new account.
//incase the user is using a different login provider, we will create a new account if one does not exist.
//all users of the site are required to have an account in the system to create or contribute to the projects
//even if the user is using a different login provider that supported by the system.
router.post('/', async(req, res) => {
    try {
        //first we check to see if the user is already in the database.
        let userData = await User.findOne({
            where: {
                name: req.body.name,
                email: req.body.email,
            }
        })

        //if the user is not existed in the database, we create a new user.
        if (!userData) {
            userData = await User.create(req.body);
        }

        const user = userData.get({ plain: true });

        //save the user info to the session storage.
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.user_name = user.name;
            req.session.user_email = user.email;
            req.session.logged_in = true;
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//this route verify the user email and password when the user login.
router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const user = userData.get({ plain: true });

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.user_name = user.name;
            req.session.user_email = user.email;
            req.session.logged_in = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

//this route logout the user.
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;