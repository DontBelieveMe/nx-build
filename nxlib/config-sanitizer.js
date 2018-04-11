var log = require('./log');

class ConfigSanitizer {
    constructor(nxConfig) {
        this.nxConfig = nxConfig;
        
        this.required = [
            "srcFiles", "buildDir", "targetName"
        ];

        this.defaults = {
            "cCompiler": "gcc",
            "cppCompiler": "g++",
            "targetType": "executable",
            "linkerFlags": "",
            "compilerFlags": "",
            "assembler": "as",
            "asmFiles": [],
            "variables": [],
            "libs": []
        };
    }
    
    checkRequiredOptions(nxConfig) {
        this.required.forEach((val, index, arr) => {
            if(nxConfig !== undefined) {
                if(nxConfig[val] === undefined) {
                    log.error(val + ' is not specified');
                    nxConfig = undefined;
                }
            }
        });

        return nxConfig;
    }

    applyDefaults(nxConfig) {
        for(var key in this.defaults) {
            if(nxConfig[key] === undefined) {
                nxConfig[key] = this.defaults[key];
            }
        } 

        return nxConfig;
    }

    sanitize() {
        var nx = this.nxConfig;        
        nx = this.checkRequiredOptions(nx);

        if(nx === undefined) 
            return nx;
        
        nx = this.applyDefaults(nx);
        
        return nx;
    }
};

module.exports = ConfigSanitizer;
