'use strict';

const log = exports;

var StringBuilder = require('./string-builder');
var os = require('os');

log.echoCommand = function(msg) {
    if(os.platform() == 'win32') {
            msg = msg.replace('%', '%%');
    }

    var sb = new StringBuilder();
    sb.append('@echo ');
    sb.append(msg);

    return sb.toString();
}

var logErrorMessages = false;

log.stdout = console.log;

log.enableErrors = function(bEnableErrors) {
    logErrorMessages = bEnableErrors;
}

log.error = function(msg) {
    if(logErrorMessages) {
        log.stdout("--- Error: " + msg);
    }
}
