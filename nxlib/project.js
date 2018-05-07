const verify = require('./verify');
const Target = require('./target');

class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.targets = [];
    }

    addTarget(target) {
        verify.isOfType(target, Target);
        this.targets.push(target);
    }
};

module.exports = Project;