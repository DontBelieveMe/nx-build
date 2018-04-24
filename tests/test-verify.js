var assert = require('assert');
var verify = require('../nxlib/verify');

describe('verify', function(){
    describe('#defaultIfUndefined()', function(){
        it('should return the default value if the input value is undefined', ()=>{
            var undefinedValue = undefined;
            var x = verify.defaultIfUndefined(x, 54321);
            
            assert.strictEqual(x, 54321);
        });

        it('should return the original input value if it is not undefined', ()=>{
            var notUndefinedValue = 'notUndefined';
            var x = verify.defaultIfUndefined(notUndefinedValue, 'default');
            
            assert.strictEqual(x, 'notUndefined');
        });
    });

    describe('#isUndefined()', function() {
        it('should return true for undefined literal', ()=>{
            var x = undefined;

            var isUndefined = verify.isUndefined(x);
            assert.strictEqual(isUndefined, true);
        });

        it('should return true for undefined string literal', ()=>{
            var isUndefined = verify.isUndefined('undefined');
            
            assert.strictEqual(isUndefined, true);
        });

        it('should return false for a non undefined variable', ()=>{
            var x = {};

            assert.strictEqual(verify.isUndefined(x), false);
        });
    });

    describe('#isOfType()', function() {
        it('should throw an Error when the typeof the variable is not of the specified type', function(){
            assert.throws(() => verify.isOfType(123, 'string'));
        });

        it('shoud throw an Error when the input object does not match the type of the required object', function(){
            class ExpectedObjectType {
            };

            class ActualObjectType {
            };

            var test = new ActualObjectType();

            assert.throws(() => verify.isOfType(test, ExpectedObjectType));
        });

        it('should allow object types that match', ()=>{
            class ObjectType {
            };

            var test = new ObjectType();

            assert.doesNotThrow(() => verify.isOfType(test, ObjectType));
        });

        it('should allow the type \'object\' to pass any object type', ()=>{
            var obj = {};
            assert.doesNotThrow(() => verify.isOfType(obj, 'object'));
        });
    });
});
