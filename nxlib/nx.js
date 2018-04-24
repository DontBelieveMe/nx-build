'use strict';

const nx = exports;
const verify = require('./verify');
var fs = require('fs');

const Target = require('./target')

const ConfigSanitizer = require('./config-sanitizer')
const MakeGenerator = require('./gnuMake/make-generator')

nx.createTarget = function() {
    return new Target();
};

nx.addTarget = function(target) {
    verify.isOfType(target, Target);

    var nxInternal = target._internal;
    var sanitizer = new ConfigSanitizer(nxInternal);
    nxInternal = sanitizer.sanitize();
    
    var generator = new MakeGenerator(nxInternal);
    var str = generator.getString();

    fs.writeFileSync('build/Makefile', str);
};