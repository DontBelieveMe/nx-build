#!/usr/bin/env node
'use strict';

const path = require('path');
const NxRunner = require('./nxlib/nx-runner');

var nxRunner = new NxRunner();
var generatorName = process.argv[2]; // Until we do proper cmd line args parsing, lets just take it as the first argument.

if(generatorName === undefined) {
    generatorName = 'make';
}

nxRunner.setGenerator(generatorName);
nxRunner.runScript(path.join(process.cwd(), 'nx.build.js'));
nxRunner.generate();