class ConfigSanitizer {
    constructor(nxConfig) {
        this.nxConfig = nxConfig;
    }
    
    sanatize() {
        var nx = this.nxConfig;

        if(nx.srcFiles === undefined) {
            console.log("ERROR: Please specify at least one source file");
            return undefined;
        }

        if(nx.buildDir === undefined) {
            console.log("ERROR: Please specify a build directory");
            return undefined;
        }

        if(nx.targetName === undefined) {
            console.log("ERROR: Please specify a target name");
            return undefined;
        }

        if(nx.targetType === undefined) {
            nx.targetType = "executable";
        }
        
        if(nx.linkerFlags === undefined) {
            nx.linkerFlags = "";
        }

        // TODO: Fix these to auto detect system compiler
        if(nx.cCompiler === undefined) {
            nx.cCompiler = "gcc"; 
        }

        if(nx.cppCompiler === undefined) {
            nx.cppCompiler = "g++";
        }
        
        if(nx.assembler === undefined) {
            nx.assembler = "as";
        }
        if(nx.asmFiles === undefined) {
            nx.asmFiles = [];
        }
        return nx;
    }
};

module.exports = ConfigSanitizer;
