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
            "assembler": "as",
            "asmFiles": []
        };
    }
    
    sanatize() {
        var nx = this.nxConfig;
        
        this.required.forEach((val, index, arr) => {
            if(nx !== undefined) {
                if(nx[val] === undefined) {
                    console.log("--- ERROR: " + val + " is not specified");
                    nx = undefined;
                }
            }
        });

        if(nx === undefined) return nx;
        
        for(var key in this.defaults) {
            if(nx[key] === undefined) {
                nx[key] = this.defaults[key];
            }
        } 
        
        return nx;
    }
};

module.exports = ConfigSanitizer;
