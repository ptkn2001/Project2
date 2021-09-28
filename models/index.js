const User = require('./user');
const Project = require('./project');
const Task = require('./task');
const Contributor = require('./contributor');

User.hasMany(Project, {
    foreignKey: 'organizer_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'organizer_id'
});

Project.hasMany(Task, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(Project, {
    foreignKey: 'project_id',
});

Project.hasMany(Contributor, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Contributor.belongsTo(Project, {
    foreignKey: 'project_id',
});

module.exports = { User, Project, Task, Contributor };