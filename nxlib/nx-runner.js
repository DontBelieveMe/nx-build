const verify = require('./verify');
const nx = require('./nx');

const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const MakeGenerator = require('./gnuMake/make-generator');
const SlnGenerator = require('./vs/sln-generator');

const ConfigSanitizer = require('./config-sanitizer');

class NxRunner {
    constructor() {
        // TODO: This is the point where we could possibly do
        // platform generator auto detection
        this._generator = undefined;
        this.targets = [];
        this._module = {};
        // Push the directory of the api into global scope for requires.
        module.paths.push(__dirname);
        this.scriptContext = vm.createContext({
            require: require,
            print: console.log,
            module: this._module
        });
    }
    
    setGenerator(generatorStr) {
        verify.isOfType(generatorStr, 'string');
        
        assert(generatorStr === 'make' || generatorStr === 'vs2017');

        this._generator = generatorStr;
    }
    
    _chooseGenerator(nxconfig) {
        if(this._generator === 'make') {
            return new MakeGenerator(nxconfig);
        } else if(this._generator === 'vs2017') {
            return new SlnGenerator(nxconfig);
        }

        return undefined;
    }
    
    runScript(filePath) {
        var strBuffer = fs.readFileSync(filePath);
        var scriptString = strBuffer.toString();

        vm.runInContext(scriptString, this.scriptContext);
        console.log(this._module.exports);
    }

    generate() {
        var targets = nx._targets;
        targets.forEach(target => {
            var nxConfigStore = target._internal;
            var sanitizer = new ConfigSanitizer(nxConfigStore);
            nxConfigStore = sanitizer.sanitize();
            var generator = this._chooseGenerator(nxConfigStore);
            if(this._generator === 'make') {
                fs.writeFileSync('build/Makefile', generator.getString());
            } else if(this._generator === 'vs2017') {
                fs.writeFileSync('build/' + nxConfigStore.targetName + '.sln', generator.getString());
            }
        });
    }
}

module.exports = NxRunner;
