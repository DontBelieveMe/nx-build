var assert = require('assert');
var config = require('../nxlib/config-options');

describe('config', function(){
    describe('#hasSharedLibTarget()', function(){
        it('should return true when the input value is `shared-library`', ()=>{
            var nx = { targetType: 'shared-library' };
            var isSharedLib = config.hasSharedLibTarget(nx);

            assert.strictEqual(isSharedLib, true);
        });

        it('should return true when the input value is `shared-lib`', ()=>{
            var nx = { targetType: 'shared-lib' };
            var isSharedLib = config.hasSharedLibTarget(nx);

            assert.strictEqual(isSharedLib, true);
        });
        
        it('should return false when the input value does not represent a shared library', ()=>{
            var nx = { targetType: 'asdfg' };
            var isSharedLib = config.hasSharedLibTarget(nx);

            assert.strictEqual(isSharedLib, false);
        });
    });

    describe('#hasStaticLibTarget()', function(){
        it('should return true when the input value is `static-library`', ()=>{
            var nx = { targetType: 'static-library' };            
            var isStaticLib = config.hasStaticLibTarget(nx);

            assert.strictEqual(isStaticLib, true);
        });

        it('should return true when the input value is `static-lib`', ()=>{
            var nx = { targetType: 'static-lib' };            
            var isStaticLib = config.hasStaticLibTarget(nx);

            assert.strictEqual(isStaticLib, true);
        });
        
        it('should return false when the input value does not represent a static library', ()=>{
            var nx = { targetType: 'poiuyt' };            
            var isStaticLib = config.hasStaticLibTarget(nx);

            assert.strictEqual(isStaticLib, false);
        });
    });

    describe('#hasExecutableTarget()', function(){
        it('should return true when the input value is `executable`', ()=>{
            var nx = { targetType: 'executable' };            
            var isExecutable = config.hasExecutableTarget(nx);

            assert.strictEqual(isExecutable, true);
        });

        it('should return true when the input value does not represent an executable', ()=>{
            var nx = { targetType: 'helloWorldDave' };            
            var isExecutable = config.hasExecutableTarget(nx);

            assert.strictEqual(isExecutable, false);
        });
    });
    
});
