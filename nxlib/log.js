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