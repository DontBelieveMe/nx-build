var StringBuilder = require('../string-builder');

class MakeRule {
    constructor(target, prerequisites, commands) {
        this.target = target;
        this.prerequisites = prerequisites;
        this.commands = commands;
    }

    buildCommandString() {
        var sb = new StringBuilder();
        sb.appendLine(this.target + ': ' + this.prerequisites);

        if(this.commands !== undefined) {
            this.commands.forEach((command) => {
                sb.appendLine('\t' + command);
            });
        }

        return sb.toString();
    }
}

module.exports = MakeRule;
