'use strict';

var StringBuilder = require('./string-builder');
var path = require('path');
var log = require('./log');
var config = require('./config-options');
var fileutils = require('./file-utils');

class MakeVariable {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class MakeRule {
    constructor(target, prerequisites, commands) {
        this.target = target;
        this.prerequisites = prerequisites;
        this.commands = commands;
    }
}

class Makefile {
    constructor() {
        this.variablesBuilder = new StringBuilder();
        this.rulesBuilder = new StringBuilder();
    }

    addVariable(variable) {
        this.variablesBuilder.appendLine(variable.name + ":=" + variable.value);
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
        this.variablesBuilder.appendLine(variable.name + "+=" + variable.value);
    }

    toString() {
        var mf = new StringBuilder();
        mf.appendLine(this.variablesBuilder.toString());
        mf.appendLine(this.rulesBuilder.toString());
        return mf.toString();
    }
}

class MakeGenerator {
    constructor(nbxConfig) {
        this.nbxConfig = nbxConfig;

        this.objFileDir = 'obj';
        this.makefile = new Makefile();
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

    _getASMRelativeArray() {
        var nx = this.nbxConfig;
        var asms = [];
        nx.asmFiles.forEach((val, index, array) => {
            var relDir = path.relative(process.cwd() + '/' + nx.buildDir, path.dirname(val));
            asms.push(path.join(relDir, path.basename(val)));
        });
        return asms;
    }

    _getCompilerFlagsString() {
        var nbx = this.nbxConfig;

        if(nbx.compilerFlags === undefined)
            return '';

        if(Array.isArray(nbx.compilerFlags)) {
            var sb = new StringBuilder();
            nbx.compilerFlags.forEach((val, index, array) => {
                if(index > 0) {
                    sb.append(' ');
                }

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
            if(index > 0){ 
                srcs.append(' ');
            }

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

            var incDir = path.relative(process.cwd() + '/' + nbx.buildDir, path.dirname(val));
            var a = val.split('/');
            incDir += '/' + a[a.length - 1];
            includes.append('-I' + incDir);
        });

        return includes.toString();
    }
    
    _getASMFileStrings() {
        var arr = this._getASMRelativeArray();
        var nx = this.nbxConfig;
        var asmString = new StringBuilder();
        arr.forEach((val, index, arr) => {
            if(index > 0) asmString.append(' ');
            asmString.append(val);
        });
        return asmString.toString();
    }
    
    _getLDFlags() {
        var nx = this.nbxConfig;
        return nx.linkerFlags; 
    }
    
    _getSubs() {
        var extensions = [
            'c',
            'C', 'CPP', 'cpp', 'cxx', 'cp', 'c++', 'cc',
            'S', 's'
        ];
        
        var sb = new StringBuilder();
        extensions.forEach((val, index, array)=>{
            sb.append('$(SOURCES:.' + val + '=.o) ');
        });
        return sb.toString();
    }

    _setVariables() {
        var mf = this.makefile;
        
        mf.addVariable(new MakeVariable('CC', this.nbxConfig.cCompiler));
        mf.addVariable(new MakeVariable('CXX', this.nbxConfig.cppCompiler));
        mf.addVariable(new MakeVariable('AR', 'ar'));
        mf.addVariable(new MakeVariable('AS', this.nbxConfig.assembler));
        mf.addVariable(new MakeVariable('CFLAGS', this._getCompilerFlagsString()));
        mf.addVariable(new MakeVariable('LDFLAGS', this._getLDFlags()));
        mf.addVariable(new MakeVariable('INCLUDEDIRS', this._getIncludeDirsString()));
        mf.addVariable(new MakeVariable('SOURCES', this._getSourcesString()));
        mf.appendToVariable(new MakeVariable('SOURCES', this._getASMFileStrings()));
        mf.addVariable(new MakeVariable('OBJECTS', '$(addprefix obj/, $(filter %.o, $(notdir ' + this._getSubs() + ')))'));
        mf.addVariable(new MakeVariable('TARGET_NAME', this.nbxConfig.targetName));
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
    /*
     * ------------------
     * TODO: Fix -> 23:34 -> 5-4-18
     * ------------------
     *  [] There is a bug ATM w/ c++ files (in this case .cc) not having any target
     *      (cannot meet target obj/otherMain.cc)
     * */

    _setCommands() {
        var mf = this.makefile;
        mf.addRule(new MakeRule('all', '$(SOURCES) $(TARGET_NAME)'));
        mf.addRule(new MakeRule('$(TARGET_NAME)', '$(OBJECTS)', [
            '@' + this._getLinkingCommand(),
            log.echoCommand("Linking target " + this.nbxConfig.targetName)
        ]));

        var rawArray = this.nbxConfig.srcFiles.concat(this.nbxConfig.asmFiles);

        var all = this._getSourceRelativeArray().concat(this._getASMRelativeArray());

        all.forEach((val, index, array) => {
            var ext = path.extname(val);
            var filename = path.basename(val, ext);
            var objFileName = this.objFileDir + '/' + filename + '.o';
            var percentageThroughBuild = Math.round(((index + 1) / array.length) * 100);
            var logMessage = "[" + percentageThroughBuild + "%] Building file " + rawArray[index];

            if(fileutils.isASMExtension(ext)) {
                mf.addRule(new MakeRule(objFileName, val, [
                    '@$(AS) $^ -o ' + objFileName,
                    log.echoCommand(logMessage)
                ]));
            } else if (fileutils.isCExtension(ext)) {
                mf.addRule(new MakeRule(objFileName, val, [
                    '@$(CC) $(INCLUDEDIRS) -c $(CFLAGS) $^ -o ' + objFileName,
                    log.echoCommand(logMessage)
                ]));
            } else if (fileutils.isCppExtension(ext)) {
                 mf.addRule(new MakeRule(objFileName, val, [
                    '@$(CXX) $(INCLUDEDIRS) -c $(CFLAGS) $^ -o ' + objFileName,
                    log.echoCommand(logMessage)
                ]));        
            }
        });
    }

    getString() {
        this._setVariables();
        this._setCommands();
        
        return this.makefile.toString();
    }
};

module.exports = MakeGenerator;
