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

        // These are defaults if the argument turns out to be invalid
        this.values = []; 
        this.flag = false;
        this.name = '';

        if (this.isValid()) {
            // Strip the leading '--'
            rawString = rawString.substring(2);

            let equalsSignSplit = rawString.split('=');
            this.name = equalsSignSplit[0];

            if (equalsSignSplit.length > 1) {

                // This condition is here to support the 
                //      --flag=
                // syntax (e.g. no options are provided)
                // If that is the case then `equalsSignSplit` will have
                // an empty string where the options would be.
                if(equalsSignSplit[1] !== '') {
                    this.flag = false;

                    let valueCommaSeperatedList = equalsSignSplit[1];
                    valueCommaSeperatedList = valueCommaSeperatedList.replace(' ', '');

                    this.values = valueCommaSeperatedList.split(',');
                } else {
                    this.values.pop();
                }
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

    public getArgumentOfName(name: string): CommandLineArg | null {
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