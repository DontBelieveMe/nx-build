class MakeRule {
    constructor(target, prerequisites, commands) {
        this.target = target;
        this.prerequisites = prerequisites;
        this.commands = commands;
    }
}

module.exports = MakeRule;
