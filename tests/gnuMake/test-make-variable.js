var assert = require('assert');

var MakeVariable = require('../../nxlib/gnuMake/make-variable');

describe('MakeVariable', function(){
    describe('#constructor()', function(){
        it('should correctly set the name and value member variables', function(){
            var mv = new MakeVariable("varName", "varValue");

            assert.strictEqual(mv.name, "varName");
            assert.strictEqual(mv.value, "varValue");
        });
    });

    describe('#buildAssignmentOpString()', function(){
        it('should correctly set the variable name when building the assignment operation string', function(){
            var mv = new MakeVariable("variableName", "testValue");
            var assignmentOpString = mv.buildAssignmentOpString();
            var actualVarName = assignmentOpString.match(/([A-Za-z]+).*/)[1];
            
            assert.strictEqual(actualVarName, "variableName");
        });

        it('should correctly set the value of the variable when building the assignment operation string', function(){
            var mv = new MakeVariable('surelyYouCantBeSerious', 'iAmAndDontCallMeShirley');
            var assignmentOpString = mv.buildAssignmentOpString();
            var actualValue = assignmentOpString.match(/[A-Za-z]+:=*([A-Za-z]+)/)[1];
            
            assert.strictEqual(actualValue, "iAmAndDontCallMeShirley");
        });

        it('should use an immediate set (:=) assignment operator', function(){
            var mv = new MakeVariable('youCallThatAKnife', 'thisIsAKnife!');
            var assignmentOpString = mv.buildAssignmentOpString();
            var actualOperator = assignmentOpString.match(/[A-Za-z]+(.{2})[A-Za-z]+/)[1];

            assert.strictEqual(actualOperator, ':=');
        });

        it('should throw an Error when a empty string is used as variable name', function(){
            var mv = new MakeVariable('', 'hiya');

            assert.throws(() => mv.buildAssignmentOpString(), Error);
        });

        it('should throw an Error when only whitespace is used as a variable name', function(){
            var mv = new MakeVariable('    ', 'whoop!');

            assert.throws(() => mv.buildAssignmentOpString(), Error);
        });

        it('should throw an Error when the variable name is undefined', function(){
            var mv = new MakeVariable(undefined, 'testing');

            assert.throws(() => mv.buildAssignmentOpString(), Error);
        });

        it('should throw an Error when the variable name is not of type string', function(){
            var mv = new MakeVariable(123, 'testing2 (like terminator 2 but better)');

            assert.throws(() => mv.buildAssignmentOpString(), Error);
        });
    });

    describe('#buildAppendOpString()', function(){


    });
});
