'use strict';

var path = require('path');

var log = require('../log');
var config = require('../config-options');
var fileutils = require('../file-utils');

var StringBuilder = require('../string-builder');
var Makefile = require('./makefile');
var MakeRule = require('./make-rule');
var MakeVariable = require('./make-variable');

class MakeGenerator {
    constructor(nbxConfig) {
        this.nbxConfig = nbxConfig;

        this.objFileDir = 'obj';
        this.makefile = new Makefile();
    }

    _makeFilePathsRelativeToBuildDir(array) {
        var nx = this.nbxConfig;
        var relativePathsOut = [];

        var configFileDir = process.cwd();
        var buildDir = path.join(configFileDir, nx.buildDir);

        array.forEach((filePath) => {
            var relativeDir = path.relative(buildDir, path.dirname(filePath));
            relativePathsOut.push(path.join(relativeDir, path.basename(filePath)));
        });

        return relativePathsOut;
    }

    _getSourceRelativeArray() {
        var nx = this.nbxConfig;
        return this._makeFilePathsRelativeToBuildDir(nx.srcFiles);
    }

    _parseFlagsConfigOption(configOption) {
        var nx = this.nbxConfig;

        if(Array.isArray(configOption)) {
            var sb = new StringBuilder();
            configOption.forEach((option, index) => {
                if(index > 0) {
                    sb.append(' ');
                }

                sb.append(option);
            });

            return sb.toString();
        } else if(typeof configOption === 'string') {
            return configOption;
        }
    }

    _getCompilerFlagsString() {
        var nx = this.nbxConfig;
        return this._parseFlagsConfigOption(nx.compilerFlags);
    }

    _getSourcesString() {
        var nbx = this.nbxConfig;
        var srcs = new StringBuilder();
        
        this._getSourceRelativeArray().forEach((val, index, array) => {
            if(index > 0){ 
                srcs.append(' ');
            }

            srcs.append(val);
            if(index < array.length - 1) {
                srcs.append(' \\\n');
            }
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
    
    _getLDFlags() {
        var nx = this.nbxConfig;
        return this._parseFlagsConfigOption(nx.linkerFlags);
    }
    
    _getSourceExtensionObjectFileSubstitutions() {
        let sb = new StringBuilder();
        let extensions = [];

        // Lets only substitute file extensions that are used.
        let srcFiles = this._getSourceRelativeArray();
        srcFiles.forEach((val) => {
            let ext = path.extname(val);
            ext = fileutils.normalizeExtension(ext);
            if(!extensions.includes(ext)) {
                extensions.push(ext);
            }
        });

        extensions.forEach((val, index, array) => {
            sb.append('$(SOURCES:.' + val + '=.o)');
            if(index < array.length - 1) {
                sb.append(' ');
            }
        });

        return sb.toString();
    }

    _getLibs() {
        let configLibs = this.nbxConfig.libs;
        // TODO: For now assume libs is an array of library names excluding extensions and
        // `lib` prefix.
        
        let libsStr = new StringBuilder();

        configLibs.forEach((libName, index) => {
            // Lets normalize any library input to be just the name of the library
            // (e.g excluding `lib` prefix or any suffixes/extensions
            let re = /-l/;
            let normalizedName = libName.replace(re, '');
            
            if(index > 0) {
                libsStr.append(' ');
            }
            
            libsStr.append('-l' + normalizedName);
        });

        return libsStr.toString();
    }

    _setVariables() {
        let mf = this.makefile;
        
        let subsArrayString = this._getSourceExtensionObjectFileSubstitutions();
        let substitutions = '$(addprefix obj/, $(filter %.o, $(notdir ' + subsArrayString + ')))';

        mf.addVariable(new MakeVariable('CC', this.nbxConfig.cCompiler));
        mf.addVariable(new MakeVariable('CXX', this.nbxConfig.cppCompiler));
        mf.addVariable(new MakeVariable('AR', 'ar'));
        mf.addVariable(new MakeVariable('AS', this.nbxConfig.assembler));
        mf.addVariable(new MakeVariable('CFLAGS', this._getCompilerFlagsString()));
        mf.addVariable(new MakeVariable('LDFLAGS', this._getLDFlags()));
        mf.addVariable(new MakeVariable('INCLUDEDIRS', this._getIncludeDirsString()));
        mf.addVariable(new MakeVariable('SOURCES', this._getSourcesString()));
        mf.addVariable(new MakeVariable('OBJECTS', substitutions));
        mf.addVariable(new MakeVariable('TARGET_NAME', this.nbxConfig.targetName));
        mf.addVariable(new MakeVariable('LIBS', this._getLibs()));
    }

    _getLinkingCommand() {
        var nx = this.nbxConfig;

        if(config.hasExecutableTarget(nx)) {
            return '$(CC) $(OBJECTS) -o $@ $(LDFLAGS) $(LIBS)';
        } else if(config.hasStaticLibTarget(nx)) {
            return '$(AR) crf lib' + nx.targetName + '.a $(OBJECTS)'; 
        } else if(config.hasSharedLibTarget(nx)) {
            return '$(CC) -shared -o lib' + nx.targetName + '.so $(OBJECTS)';
        }
    }
 
    _setCommands() {
        var mf = this.makefile;
        mf.addRule(new MakeRule('all', '$(SOURCES) $(TARGET_NAME)'));
        mf.addRule(new MakeRule('$(TARGET_NAME)', '$(OBJECTS)', [
            '@' + this._getLinkingCommand(),
            log.echoCommand("Linking target " + this.nbxConfig.targetName)
        ]));

        var rawArray = this.nbxConfig.srcFiles.concat(this.nbxConfig.asmFiles);

        var all = this._getSourceRelativeArray();
        
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
