import * as assert from 'assert';

import { CommandLineArgsParser } from '../../src/app/args-parser';

describe('CommandLineArgParser', () => {
    describe('#getArgumentOfName()', () => {
        it('Should return a the valid instance of the command line argument if it exists', () => {
            let args = ['--generator'];
            let parser = new CommandLineArgsParser(args);

            let arg = parser.getArgumentOfName('generator');

            assert.strictEqual(arg.getName(), 'generator');
        });

        it('Should return null if there does not exist an argument with the specified name', () => {
            let args = ['--generator'];
            let parser = new CommandLineArgsParser(args);

            let arg = parser.getArgumentOfName('this_name_does_not_exist');
            
            assert.strictEqual(arg, null);
        });
    });

    describe('#hasArgument()', () => {
        it('Should return true if there is a command line argument with the specified name', () => {
           let args = ['--generator', '--name'];
           
           let parser = new CommandLineArgsParser(args);
           
           assert.strictEqual(parser.hasArgument('name'), true);
        });

        it('Should return false if there is not command with the specified name', () => {
            let args = ['--name1', '--name2'];

            let parser = new CommandLineArgsParser(args);

            assert.strictEqual(parser.hasArgument('this_does_not_exist'), false);
        });
    });

    describe('#constructor()', () => {
        it('Should parse an array of arguments into an array if the input array is valid', () => {
            let args = ['--generator=make', '--do_stuff'];
            let parser = new CommandLineArgsParser(args);
            
            assert.strictEqual(parser.getArgumentsArray().length, 2);
        });

        it('Should result in an empty array when the input raw data is null or undefined', () => {
            let undefinedArgs = undefined;
            let undefinedParser = new CommandLineArgsParser(undefinedArgs);
            
            assert.strictEqual(undefinedParser.getArgumentsArray().length, 0);
            
            let nullArgs = null;
            let nullParser = new CommandLineArgsParser(nullArgs);

            assert.strictEqual(nullParser.getArgumentsArray().length, 0);
        });

        it('Should correctly filter out arguments that do not begin with --', () => {
            let args = ['--valid', 'invalid'];

            let parser = new CommandLineArgsParser(args);
            
            assert.strictEqual(parser.getArgumentsArray().length, 1);
            assert.strictEqual(parser.getArgumentsArray()[0].getName(), 'valid');
        });
    });

});

