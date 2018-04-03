'use strict';

const log = exports;

var StringBuilder = require('./string-builder');
var os = require('os');

var bLogInfo = true;

log.setQuietMode = function(quiet) {
    bLogInfo = quiet;
}

log.echoCommand = function(msg) {
    if(bLogInfo) {
        if(os.platform() == 'win32') {
            msg = msg.replace('%', '%%');
        }

        var sb = new StringBuilder();
        sb.append('@echo ');
        sb.append(msg);

        return sb.toString();
    }
}