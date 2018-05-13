import { CommandLineArgsParser, CommandLineArg } from './args-parser';

export function onProgramStart() {
    let commandLineArguments: string[] = process.argv;
    let commandLineArgsParser = new CommandLineArgsParser(commandLineArguments);

    console.log(commandLineArgsParser.hasArgument('generator'));
}