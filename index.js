#!/usr/bin/env node
'use strict';

var fs = require('fs');
var vm = require('vm');

const NxRunner = require('./nxlib/nx-runner');

var ctx = vm.createContext({
    require: require,
    print: console.log,
    scriptDir: rootDir,
});

var rootDir = process.cwd();
module.paths.push(__dirname + '/nxlib');

fs.readFile(rootDir + '/nx.build.js', function(err, data){
    var nxRunner = new NxRunner();
    var generatorName = process.argv[2]; // Until we do proper cmd line args parsing, lets just take it as the first argument.
    if(generatorName === undefined) generatorName = 'make';
    nxRunner.setGenerator(generatorName);
    vm.runInContext(data.toString(), ctx);
    nxRunner.generate();
});
