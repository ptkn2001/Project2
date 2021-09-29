const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contributor extends Model {}

Contributor.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ammount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    project_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'project',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'contributor',
});

module.exports = Contributor;