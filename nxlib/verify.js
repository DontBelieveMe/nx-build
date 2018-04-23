'use strict';

const verify = exports;

verify.isOfType = function(variable, type) {
    var err = new Error("Argument (" + variable + ") is not of expected type " + type);
    
    if(typeof variable === 'object') {
        if(!(variable instanceof type)) {
            throw err;
        }
    }
    
    if(typeof variable !== type) {
        throw err;
    }
}