var assert = require('assert');
var verify = require('../nxlib/verify');

describe('verify', function(){
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

        it('should allow the type \'object\' to pass any object type', ()=>{
            var obj = {};
            assert.doesNotThrow(() => verify.isOfType(obj, 'object'));
        });
    });
});
