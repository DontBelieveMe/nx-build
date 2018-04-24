'use strict';

const verify = require('./verify');

class Target {
    constructor() {
        this._internal = {"buildDir": 'build',"cCompiler": "gcc"};
    }

    setName(name) {
        verify.isOfType(name, 'string');

        this._internal.targetName = name;
    }
    
    setType(type) {
        verify.isOfType(type, 'string');
        this._internal.targetType = type;
    }

    addHeaderFile(file) {
        verify.isOfType(file, 'string');

        this._internal.headerFiles = verify.defaultIfUndefined(this._internal.headerFiles, []);
        this._internal.headerFiles.push(file);
    }

    addIncludeDir(dir) {
        verify.isOfType(dir, 'string');

        this._internal.includeDirs = verify.defaultIfUndefined(this._internal.includeDirs, []);
        this._internal.includeDirs.push(dir);
    }
    
    addSrcFile(srcFile) {
        verify.isOfType(srcFile, 'string');
        
        this._internal.srcFiles = verify.defaultIfUndefined(this._internal.srcFiles, []);
        this._internal.srcFiles.push(srcFile);
    }
}

module.exports = Target;