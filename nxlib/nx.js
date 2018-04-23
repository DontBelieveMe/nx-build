'use strict';

const nx = exports;
const verify = require('./verify');

const Target = require('./target')

nx.createTarget = function() {
    return new Target();
};

nx.addTarget = function(target) {
    verify.isOfType(target, Target);
    console.log(target.toString());
};