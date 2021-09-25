const User = require('./user');
const Project = require('./project');
const Task = require('./task');

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

User.hasMany(Task, {
    foreignKey: 'task_owner_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(User, {
    foreignKey: 'task_owner_id'
});

module.exports = { User, Project, Task };