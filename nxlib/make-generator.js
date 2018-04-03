'use strict';

var StringBuilder = require('./string-builder');
var path = require('path');

class MakeGenerator {
    constructor(nbxConfig) {
        this.nbxConfig = nbxConfig;

        this.objFileDir = 'obj';
    }

    _getSourceRelativeArray() {
        var nbx = this.nbxConfig;
        var srcs = [];

        nbx.srcFiles.forEach((val, index, array) => {
            var relDir = path.relative(process.cwd() + '/' + nbx.buildDir, path.dirname(val));
            srcs.push(path.join(relDir, path.basename(val)));
        });

        return srcs;
    }

    _getSourcesString() {
        var nbx = this.nbxConfig;
        var srcs = new StringBuilder();
        
        this._getSourceRelativeArray().forEach((val, index, array) => {
            if(index > 0) 
                srcs.append(' ');
            
                srcs.append(val);
        });

        return srcs.toString();
    }

    _getIncludeDirsString() {
        var nbx = this.nbxConfig;
        if(nbx.includeDirs === undefined)
            return "";
        
        var includes = new StringBuilder();
        nbx.includeDirs.forEach((val, index, array) => {
            if(index > 0)
                includes.append(' ');

            var incDir = path.relative(process.cwd() + '/' + nbx.buildDir, path.dirname(val)) + '/' + val;

            includes.append('-I' + incDir);
        });

        return includes.toString();
    }

    _getVarsString() {
        var vars = new StringBuilder();
        vars.appendLine("CC:=gcc");
        vars.appendLine("CFLAGS:=-c -Wall");
        vars.appendLine("LDFLAGS:=");
        vars.appendLine("INCLUDEDIRS:=" + this._getIncludeDirsString())
        vars.appendLine("SOURCES:=" + this._getSourcesString());
        vars.appendLine("OBJECTS:=$(SOURCES:.c=.o)");
        vars.appendLine("OBJECTS:=$(addprefix obj/, $(notdir $(OBJECTS)))");
        vars.appendLine("TARGET_NAME:=" + this.nbxConfig.targetName);
        return vars.toString();
    }

    _getCommandsString() {
        var cmds = new StringBuilder();
        cmds.appendLine("all: $(SOURCES) $(TARGET_NAME)");
        cmds.appendLine("$(TARGET_NAME): $(OBJECTS)");
        cmds.appendLine("\t@$(CC) $(LDFLAGS) $(OBJECTS) -o $@");
        cmds.appendLine("\t@echo Linking executable");
        cmds.appendLine();

        var rawSrcFilePaths = this.nbxConfig.srcFiles;
        this._getSourceRelativeArray().forEach((val, index, array) => {
            var filename = path.basename(val, '.c');
            var objFileName = this.objFileDir + '/' + filename + '.o';
            var percentageThroughBuild = Math.round(((index + 1) / array.length) * 100);
            cmds.appendLine(objFileName + ': ' + val);
            cmds.appendLine('\t@$(CC) $(INCLUDEDIRS) $(CFLAGS) $^ -o ' + objFileName);
            cmds.appendLine("\t@echo [" + percentageThroughBuild + "%] Building file " + rawSrcFilePaths[index]);
        });

        return cmds.toString();
    }

    getString() {
        var makefile = new StringBuilder();
        makefile.appendLine(this._getVarsString());
        makefile.appendLine(this._getCommandsString());
        return makefile.toString();
    }
};

module.exports = MakeGenerator;