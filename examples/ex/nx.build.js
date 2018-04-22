/*
    We can require modules from nxlib
*/
var StringBuilder = require('string-builder');

var sb = new StringBuilder();
sb.appendLine("Line 1");
sb.append("Line 2 (");
sb.append('appended');
sb.append(')');

print(sb.toString());

/*
    We can also require (and use) builtin node modules
*/
var fs = require('fs');
fs.readFile(scriptDir + '/src/main.c', (err,data)=>{
    print(data.toString());
});