import * as vm from 'vm';

export class ScriptRunner {
    private context: vm.Context;
    
    constructor() {
        this.context = vm.createContext({
            print: console.log
        });
    }

    public runScriptFromText(scriptText: string) {
        vm.runInContext(scriptText, this.context);
    }
}

