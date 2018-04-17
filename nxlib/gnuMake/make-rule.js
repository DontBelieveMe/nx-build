var StringBuilder = require('../string-builder');
var assert = require('assert');

class MakeRule {
    constructor(target, prerequisites, commands) {
        this.target = target;
        this.prerequisites = prerequisites;
        this.commands = commands;
    }

    buildRuleString() {
        var sb = new StringBuilder();
        
        var prereqString = null;
        if(Array.isArray(this.prerequisites)) {
            var preqSb = new StringBuilder();
            this.prerequisites.forEach((prereq, index) => {
                if(index > 0) {
                    preqSb.append(' ');
                }
                preqSb.append(prereq);
            });

            prereqString = preqSb.toString();
        } else if(typeof this.prerequisites === 'string') {
            prereqString = this.prerequisites;
        }
        
        assert(prereqString !== null);
        
        sb.appendLine(this.target + ': ' + prereqString);

        if(this.commands !== undefined) {
            if(Array.isArray(this.commands)) {
                this.commands.forEach((command) => {
                    sb.appendLine('\t' + command);
                });
            }
        }

        return sb.toString();
    }
}

module.exports = MakeRule;
