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

    describe('#error()', function(){
        it('should write to stdout if log.enableErrors(true) is set', function(){
            var logged = false;
            log.stdout = function(m) {
                logged = true;
            };

            log.enableErrors(true);
            log.error("output");

            assert.strictEqual(logged, true);
            
            log.stdout = console.log;
        });

        it('should not output any message if errors are disabled', function(){
            var logged = false;
            log.stdout = function(m) { logged = true; }
            log.enableErrors(false);
            log.error("output");
            log.enableErrors(true);

            assert.strictEqual(logged, false);

            log.stdout = console.log;
        });
    });
});
