export class CommandLineArg {
    private valid: boolean;
    private rawString: string;

    private name: string;
    private values: string[];

    private flag: boolean;

    constructor(rawString: string) {
        let validArgumentRegex = /\-\-.+/
        this.valid = validArgumentRegex.test(rawString);
        this.rawString = rawString;

        if(this.isValid()) {
            // Strip the leading '--'
            rawString = rawString.substring(2);
            
            let equalsSignSplit = rawString.split('=');
            this.name = equalsSignSplit[0];
            this.values = [];

            if(equalsSignSplit.length > 1) {
                this.flag = false;

                let valueCommaSeperatedList = equalsSignSplit[1];
                valueCommaSeperatedList = valueCommaSeperatedList.replace(' ', '');
                
                this.values = valueCommaSeperatedList.split(',');
            } else {
                this.flag = true;
            }
        }
    }

    public isFlag(): boolean {
        return this.flag;
    }

    public getName(): string {
        return this.name;
    }

    public getValues(): string[] {
        return this.values;
    }

    public isValid(): boolean {
        return this.valid;
    }

    public getRawString(): string {
        return this.rawString;
    }
}

export class CommandLineArgsParser {   
    private parsedArguments: CommandLineArg[];

    constructor(rawArgsArray: string[]) {
        this.parsedArguments = [];
        
        if(rawArgsArray) {
            for (const rawArgument of rawArgsArray) {
                let parsedArg: CommandLineArg = new CommandLineArg(rawArgument);
                if(parsedArg.isValid()) {
                    this.parsedArguments.push(parsedArg);
                }
            }
        }
    }

    public getArgumentsArray(): CommandLineArg[] {
        return this.parsedArguments;
    }

    public getArgumentOfName(name: string): CommandLineArg {
        for (const arg of this.parsedArguments) {
            if(arg.getName() === name) {
                return arg;
            }
        }

        return null;
    }

    public hasArgument(argumentName: string): boolean {
        return this.getArgumentOfName(argumentName) !== null;
    }
}