var StringBuilder = require('../string-builder.js');

class Makefile {
    constructor() {
        this.variablesBuilder = new StringBuilder();
        this.rulesBuilder = new StringBuilder();
    }

    addVariable(variable) {
        this.variablesBuilder.appendLine(variable.buildAssignmentOpString());
    }

    addRule(rule) {
        this.rulesBuilder.appendLine(rule.target + ': ' + rule.prerequisites);
        
        if(rule.commands !== undefined) {
            rule.commands.forEach((val, index, array) => {
                this.rulesBuilder.appendLine('\t' + val);
            });
        }
    }
    
    appendToVariable(variable) {
        this.variablesBuilder.appendLine(variable.buildAppendOpString());
    }

    toString() {
        var mf = new StringBuilder();
        mf.appendLine(this.variablesBuilder.toString());
        mf.appendLine(this.rulesBuilder.toString());
        return mf.toString();
    }
}

module.exports = Makefile;

