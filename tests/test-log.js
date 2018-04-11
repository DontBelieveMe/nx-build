var assert = require('assert');
var os = require('os');
var log = require('../nxlib/log');

describe('log', function(){
    describe('#echoCommand()', function() {
        it('should return a echo command that prints the specified message', function(){
            var cmd = log.echoCommand("hey there");

            assert.strictEqual(cmd, '@echo hey there');
        });

        it('should escape the % character on windows', function(){
            let oldPlatform = os.platform();

            // Mock the OS as Win32
            os.platform = function() {
                return 'win32';
            };

            var cmd = log.echoCommand('40%');

            assert.strictEqual(cmd, '@echo 40%%');

            os.platform = function() { return oldPlatform;}
        });

        it('should not escape the % character on non windows enviroments', function(){
            let oldPlatform = os.platform();

            // Mock the OS as linux
            os.platform = function() {
                return 'linux';
            };

            var cmd = log.echoCommand('40%');

            assert.strictEqual(cmd, '@echo 40%');

            os.platform = oldPlatform;
        });
    });

});
