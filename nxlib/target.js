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
    }
    
    addSrcFile(srcFile) {
        if(this._internal.srcFiles === undefined) {
            this._internal.srcFiles = [];
        }

        this._internal.srcFiles.push(srcFile);
    }
}

module.exports = Target;