import * as assert from 'assert';

import { CommandLineArg } from '../../src/app/args-parser';

describe('CommandLineArg', () => {
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

    describe('#setName()', () => {
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

