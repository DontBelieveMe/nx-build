'use strict';

const nx = exports;
const verify = require('./verify');
var fs = require('fs');

const Target = require('./target')

const ConfigSanitizer = require('./config-sanitizer')
const MakeGenerator = require('./gnuMake/make-generator')
const SlnGenerator = require('./vs/sln-generator');

nx.createTarget = function() {
    return new Target();
};

nx.createProject = function(projectName) {
    return new Project();
}

nx._targets = [];

nx.addTarget = function(target) {
    verify.isOfType(target, Target);
    
    nx._targets.push(target);
};
