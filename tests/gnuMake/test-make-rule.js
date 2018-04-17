var assert = require('assert');
var MakeRule = require('../../nxlib/gnuMake/make-rule');

describe('MakeRule', function(){
    describe('#buildCommandString()', function() {
        it('should correctly build the target name', function(){
            var mr = new MakeRule('targetName', 'pr', []);
            var makeRuleString = mr.buildCommandString();

            var actualTargetName = makeRuleString.match(/(.+):.+/)[1];

            assert.strictEqual(actualTargetName, 'targetName');
        });
    });
});
