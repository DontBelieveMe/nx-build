'use strict';

var StringBuilder = require('./string-builder');
var path = require('path');
var log = require('./log');
var config = require('./config-options');

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

    _getCompilerFlagsString() {
        var nbx = this.nbxConfig;

        if(nbx.compilerFlags === undefined)
            return '';

        if(Array.isArray(nbx.compilerFlags)) {
            var sb = new StringBuilder();
            nbx.compilerFlags.forEach((val, index, array) => {
                if(index > 0) 
                    sb.append(' ');
                
                    sb.append(val);
            });
            
            return sb.toString();
        } else if(typeof nbx.compilerFlags === "string") {
            return nbx.compilerFlags;
        }
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
        // TODO We should abstract these away into a format like
        // var mf = new MakefileBuilder();
        // mf.addVariable(new MakeVariable("CC", "gcc"));
        // mf.addVariable(new MakeVariable("OBJECTS", "$(SOURCES:.c=.o)"));
        vars.appendLine("CC:=gcc");
        vars.appendLine("AR:=ar");
        vars.appendLine("CFLAGS:=" + this._getCompilerFlagsString());
        vars.appendLine("LDFLAGS:=");
        vars.appendLine("INCLUDEDIRS:=" + this._getIncludeDirsString())
        vars.appendLine("SOURCES:=" + this._getSourcesString());
        vars.appendLine("OBJECTS:=$(SOURCES:.c=.o)");
        vars.appendLine("OBJECTS:=$(addprefix obj/, $(notdir $(OBJECTS)))");
        vars.appendLine("TARGET_NAME:=" + this.nbxConfig.targetName);
        return vars.toString();
    }

    _getLinkingCommand() {
        var nx = this.nbxConfig;

        if(config.hasExecutableTarget(nx)) {
            return '$(CC) $(LDFLAGS) $(OBJECTS) -o $@';
        } else if(config.hasStaticLibTarget(nx)) {
            return '$(AR) crf lib' + nx.targetName + '.a $(OBJECTS)'; 
        } else if(config.hasSharedLibTarget(nx)) {
            return '$(CC) -shared -o lib' + nx.targetName + '.so $(OBJECTS)';
        }
    }

    _getCommandsString() {
        // TODO We should abstract these away into a format like
        // var mf = new MakefileBuilder();
        // var command = new MakeCommand(this._getLinkingCommand()).setSilent();
        // mf.addRule(new MakeRule("all", "$(SOURCES) $(TARGET_NAME)", command));
        var cmds = new StringBuilder();
        cmds.appendLine("all: $(SOURCES) $(TARGET_NAME)");
        cmds.appendLine("$(TARGET_NAME): $(OBJECTS)");
        cmds.appendLine("\t@" + this._getLinkingCommand());
        cmds.appendLine("\t" + log.echoCommand("Linking target!"));
        cmds.appendLine();

        var rawSrcFilePaths = this.nbxConfig.srcFiles;
        this._getSourceRelativeArray().forEach((val, index, array) => {
            var filename = path.basename(val, '.c');
            var objFileName = this.objFileDir + '/' + filename + '.o';
            var percentageThroughBuild = Math.round(((index + 1) / array.length) * 100);
            cmds.appendLine(objFileName + ': ' + val);
            cmds.appendLine('\t@$(CC) $(INCLUDEDIRS) -c $(CFLAGS) $^ -o ' + objFileName);
            
            var echoCmd = log.echoCommand("[" + percentageThroughBuild + "%] Building file " + rawSrcFilePaths[index]);
            cmds.appendLine("\t" + echoCmd);
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