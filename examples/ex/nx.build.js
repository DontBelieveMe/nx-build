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

// tmp
var nx = {};
var platform = {};

platform.isWin32  = () => { return true; };
platform.isLinux = () => {return false;};

nx.srcFiles = [
    "src/main.c"
];

if(platform.isWin32()) {
    nx.srcFiles.push('src/platformSpecific.win32.c');
} else if(platform.isLinux()) {
    nx.srcFiles.push('src/platformSpecific.win32.c');
}

nx.headerFiles = [
    "include/main.h"
];

nx.targetName = "helloWorld";

/*
    Do we want member assignment style - e.g.
        nx.targetName = ...;
        nx.srcFiles = [ ... ];
    
    or member function style - e.g.
        nx.addSrcFile("src/main.c");
        nx.addSrcFiles([ ... ]);

        nx.setTargetName("mathsLibrary");
        nx.setTargetType("library");
        
    Maybe ask dev.to community for opinion?
*/