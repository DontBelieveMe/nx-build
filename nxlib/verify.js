'use strict';

const verify = exports;

verify.isOfType = function(variable, type) {
    var err = "Argument (" + variable + ") is not of expected type " + type;

    if(typeof variable === 'object') {
        if(!(variable instanceof type)) {
            throw new Error(err);
        }

        return;
    }
    
    if(typeof variable !== type) {
        throw new Error(err);
    }
}