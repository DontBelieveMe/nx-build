var nx = require('nx');

var target = nx.createTarget();

target.setName('helloWorld');
target.setName('executable');

target.addSrcFile('src/main.c');

nx.addTarget(target);