'use strict';

const verify = exports;

verify.TYPE_STRING = 'string';
verify.TYPE_NUMBER = 'number';
verify.TYPE_BOOL = 'boolean';
verify.TYPE_FUNCTION = 'function';
verify.TYPE_OBJECT = 'object';
verify.TYPE_UNDEFINED = 'undefined';

verify.isOfType = function(variable, type) {
    var err = "Argument (" + variable + ") is not of expected type " + type;

    // If we expect only an generic 'object' then
    // we can just skip to the final check
    if(typeof variable === 'object' && type !== 'object') {
        if(!(variable instanceof type)) {
            throw new Error(err);
        }

        return;
    }
    
    if(typeof variable !== type) {
        throw new Error(err);
    }
}

verify.isUndefined = function(variable) {
    return variable === undefined || variable === 'undefined';
}

verify.defaultIfUndefined = function(variable, defaultValue) {
    if(verify.isUndefined(variable)) {
        return defaultValue;
    }

    return variable;
}