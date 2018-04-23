'use strict';

const verify = require('./verify');

class Target {
    setName(name) {
        verify.isOfType(name, 'string');
    }
    
    setType(type) {
        verify.isOfType(type, 'string');
    }
    
    addSrcFile(srcFile) {
    }
}

module.exports = Target;