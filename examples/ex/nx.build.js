var nx = require('nx');

var target = nx.createTarget();

target.setName('helloWorld');
target.setName('executable');

target.addSrcFile('src/main.c');
target.addSrcFile('src/impl.c')

target.addIncludeDir('include');
target.addHeaderFile('include/impl.h');

nx.addTarget(target);