'use strict';

const verify = exports;

verify.isOfType = function(variable, type) {
    var err = "Argument (" + variable + ") is not of expected type " + type;

    // If we expect only an generic 'object' then
    // we can just skip to the final check
    if(typeof variable === 'object' && type !== 'object') {
        if(!(variable instanceof type)) {
            throw new Error(err);
        }
    }
    
    if(typeof variable !== type) {
        throw new Error(err);
    }
}