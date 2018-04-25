const ProjectTypeGuids = require('./project-type-guids');

const uuidv4 = require('uuid/v4');
const StringBuilder = require('../string-builder');

class GlobalSection {
    constructor(name, rightHandSide, lines) {
        this.name = name;
        this.rightHandSide = rightHandSide;
        this.lines = lines;
    }

    getString() {
        var sb = new StringBuilder();

        sb.appendLine('\tGlobalSection(' + this.name + ') = ' + this.rightHandSide);
        this.lines.forEach(element => {
            sb.appendLine('\t\t' + element)
        });
        sb.append('\tEndGlobalSection');

        return sb.toString();
    }
}

class SlnGenerator {
    constructor(nxConfig) {
        this.nxConfig = nxConfig;
        this.objFileDir = 'obj';
        
        this.projectGuid = uuidv4();
    }

    _generateProjectBeginFileLine() {
        var projectName = this.nxConfig.targetName;

        var projectFileLine = new StringBuilder();
        
        projectFileLine.append('Project("' + ProjectTypeGuids.WINDOWS_VCPP + '") = ');
        projectFileLine.append('"' + projectName + '", "' + projectName + '.vcxproj", ');
        projectFileLine.append('"{' + this.projectGuid + '}"');
        return projectFileLine.toString();
    }

    _generateProjectEndFileLine() {
        return 'EndProject';
    }

    _generateGlobal() {
        var sb = new StringBuilder();
        sb.appendLine("Global");
        
        var solutionNotes = new GlobalSection('SolutionNotes', 'postSolution', []);
        var solutionConfig = new GlobalSection('SolutionConfiguration', 'preSolution', [
            'ConfigName.0 = Debug',
            'ConfigName.1 = Release'
        ]);

        sb.appendLine(solutionNotes.getString());
        sb.appendLine(solutionConfig.getString());

        sb.append("EndGlobal");
        return sb.toString();
    }

    getString() {
        var slnFormatVersion = "12.00";

        var sb = new StringBuilder();
        sb.appendLine('Microsoft Visual Studio Solution File, Format Version ' + slnFormatVersion);
        sb.appendLine(this._generateProjectBeginFileLine());
        sb.appendLine(this._generateProjectEndFileLine());
        sb.appendLine(this._generateGlobal());
        return sb.toString();
    }
};

module.exports = SlnGenerator;