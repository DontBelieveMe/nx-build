import * as assert from 'assert';

import { CommandLineArg } from '../../src/app/args-parser';

describe('CommandLineArg', () => {
    describe('#isValid()', () => {
        it('should return true if a command line argument string has the "--" prefix.', () => {
            let arg = new CommandLineArg('--aValidArgument');

            assert.strictEqual(arg.isValid(), true);
        });

        it('should return false if a command line argument string does not have the "--" prefix', () => {
            let arg = new CommandLineArg('notAVaildArgument');

            assert.strictEqual(arg.isValid(), false);
        });
    });

    describe('#getRawString()', () => {
        it('should return the raw argument string passed to the constructor regardless of any other factors', () => {
            let arg = new CommandLineArg('ThisShouldReturnOut:D');
            
            assert.strictEqual(arg.getRawString(), 'ThisShouldReturnOut:D');
        });
    });

    describe('#getValues()', () => {
        it('should return a string[] consisting of all comma seperated options passed to a argument', () => {
            let arg = new CommandLineArg('--flag=one,two,three,four');

            let expectedOutput = [
                'one', 'two', 'three', 'four'
            ];

            assert.deepStrictEqual(arg.getValues(), expectedOutput);
        });

        it('should return a string[] when only one option is passed to the argument', () => {
            let arg = new CommandLineArg('--flag=item');

            let expectedOutput = [
                'item'
            ];

            assert.deepStrictEqual(arg.getValues(), expectedOutput);
        });

        it('should return an empty array when the argument is a flag', () => {
            let arg = new CommandLineArg('--flag');

            assert.strictEqual(arg.getValues().length, 0);
        });

        it('should return an empty array when no options are passed to an argument (e.g. with the equals sign but not options)', () => {
            let arg = new CommandLineArg('--flag=');

            assert.strictEqual(arg.getValues().length, 0);
        });
    });

    describe('#isFlag()', () => {
        it('should detect if a valid command line argument is a flag or an option (e.g. --arg or --arg=...)', () => {
            let arg = new CommandLineArg('--isAFlag');

            assert.strictEqual(arg.isFlag(), true);
        });

        it('should detect if a valid command line argument is not a flag', () => {
            let arg = new CommandLineArg('--notAFlag=argument');

            assert.strictEqual(arg.isFlag(), false);
        });

        it('return false if the command line argument string is invalid', () => {
            let arg = new CommandLineArg('notAnArgument');

            assert.strictEqual(arg.isFlag(), false);
        });
    });

    describe('#getName()', () => {
        it('should correctly parse the "name" of the argument (e.g --<name>) for a valid argument flag', () => {
            let arg = new CommandLineArg('--flagName');

            assert.strictEqual(arg.getName(), 'flagName');
        });

        it('should correctly parse the "name" of the argument for a valid options argument', () => {
            let arg = new CommandLineArg('--flagNameTwo=arg1,arg2,arg3');

            assert.strictEqual(arg.getName(), 'flagNameTwo');
        });
    });
});

