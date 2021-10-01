const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    'heroku_d248daa1fbf1b66',
    'b18dcf67053d5e',
    '6a2c6346', {
        host: 'us-cdbr-east-04.cleardb.com',
        dialect: 'mysql'
    }
);

module.exports = sequelize;