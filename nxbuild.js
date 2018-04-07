#!/usr/bin/env node
'use strict'

var fs = require('fs');
var rootDir = process.cwd();
var exec = require('child_process').exec;
var log = require('./nxlib/log');
var MakeGenerator = require('./nxlib/make-generator');
var ConfigSanitizer = require('./nxlib/config-sanitizer');

// https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(path);
    }
};

fs.readFile(rootDir + '/nxbuild.json', function(err, data) {
    var nbxConfig = JSON.parse(data.toString());    
    
    var configSanitizer = new ConfigSanitizer(nbxConfig);
    nbxConfig = configSanitizer.sanitize();
    
    if(nbxConfig === undefined) 
        return;
    
    var makeGenerator = new MakeGenerator(nbxConfig);
    
    var buildDir = nbxConfig.buildDir;
    if(!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }

    if(fs.existsSync(buildDir + '/Makefile'))
        fs.unlinkSync(buildDir + '/Makefile');
    if(fs.existsSync(buildDir + '/' + nbxConfig.targetName))
        fs.unlinkSync(buildDir + '/' + nbxConfig.targetName);

    deleteFolderRecursive(buildDir + '/obj');
    fs.mkdirSync(buildDir + '/obj');
    
    fs.writeFileSync('build/Makefile', makeGenerator.getString());
});
