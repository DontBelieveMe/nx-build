#!/usr/bin/env node
'use strict';

var fs = require('fs');
var vm = require('vm');

var ctx = vm.createContext({
    require: require,
    print: console.log,
    scriptDir: rootDir,
});

var rootDir = process.cwd();
module.paths.push(__dirname + '/nxlib');

fs.readFile(rootDir + '/nx.build.js', function(err, data){
    vm.runInContext(data.toString(), ctx);
});
