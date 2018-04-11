var assert = require('assert');
var ConfigSanitizer = require('../nxlib/config-sanitizer');
var log = require('../nxlib/log');

describe('ConfigSanitizer', function(){
    describe('#checkRequiredOptions()', function() {
        it('should return undefined if the config file does not contain a required field', function(){
            log.enableErrors(false);

            var nx = {}; 
            var configSanitizer = new ConfigSanitizer(nx);
            var newNx = configSanitizer.checkRequiredOptions(nx);
            
            assert.strictEqual(newNx, undefined);

            log.enableErrors(true);
        });

        it('should do nothing if the config file contains all required fields', function(){
            var nx = {
                "srcFiles": [],
                "targetName": "test",
                "buildDir": "build"
            };

            var configSanitizer = new ConfigSanitizer(nx);
            var newNx = configSanitizer.checkRequiredOptions(nx);

            assert.strictEqual(newNx, nx);
        });
    });

    describe('#applyDefaults()', function(){
        it('should set a property to its specified default value if it does not exist', function(){
            var nx = {
                "srcFiles": [],
                "targetName": "test",
                "buildDir": "build"
            };

            var configSanitizer = new ConfigSanitizer(nx);
            var newNx = configSanitizer.applyDefaults(nx);

            for(var prop in configSanitizer.defaults) {
                assert.strictEqual(newNx[prop], configSanitizer.defaults[prop]);
            }
        });

        it('should leave alone optional properties that have been specified', function(){
            var nx = {
                "srcFiles": [],
                "targetName": "test",
                "buildDir": "build",
                "compilerFlags": "-Werror"
           };

           var configSanitizer = new ConfigSanitizer(nx);
           var newNx = configSanitizer.applyDefaults(nx);

           assert.strictEqual(newNx["compilerFlags"], "-Werror");
       });

       it('should leave alone optional properties that have a different (but valid) type', function(){
            var nx = {
                "srcFiles": [],
                "targetName": "test",
                "buildDir": "build",
                "compilerFlags": [      // compilerFlags defaults to string
                    "-Werror",
                    "-Wpedantic"
                ]
            };

            var configSanitizer = new ConfigSanitizer(nx);
            var newNx = configSanitizer.applyDefaults(nx);

            assert.strictEqual(Array.isArray(newNx["compilerFlags"]), true);
        });
    });
});
