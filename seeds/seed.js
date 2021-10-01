const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const { User, Project, Task, Contributor } = require('../models');
const userData = require('./userData.json');
const projectData = require('./projectData.json');
const taskData = require('./taskData.json');
const contributorData = require('./contributorData.json');

const createDatabase = async() => {
    const config = sequelize.config;
    const sequelize2 = new Sequelize(`mysql://${config.username}:${config.password}@${config.host}:${config.port}`);
    await sequelize2.query(`DROP DATABASE IF EXISTS ${config.database};`);
    await sequelize2.query(`CREATE DATABASE ${config.database};`);
};

const seedDatabase = async() => {
    await createDatabase();
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Project.bulkCreate(projectData);
    // await Task.bulkCreate(taskData);
    // await Contributor.bulkCreate(contributorData);
    process.exit(0);
};

seedDatabase();