var nx = require('nx');

var project = nx.createProject();
var target = project.createTarget(); 

target.setName('helloWorld');
target.setType('executable');

target.addSrcFile('src/main.c');
target.addSrcFile('src/impl.c')

target.addIncludeDir('include');
target.addHeaderFile('include/impl.h');

project.addTarget(target);

module.exports = 123;