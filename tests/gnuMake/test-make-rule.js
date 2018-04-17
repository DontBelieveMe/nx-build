var assert = require('assert');
var MakeRule = require('../../nxlib/gnuMake/make-rule');

describe('MakeRule', function(){
    describe('#buildCommandString()', function() {
        it('should correctly build the target name', function(){
            var mr = new MakeRule('targetName', 'pr', []);
            var makeRuleString = mr.buildRuleString();

            var actualTargetName = makeRuleString.match(/(.+):.+/)[1];

            assert.strictEqual(actualTargetName, 'targetName');
        });

        it('should correctly build the prerequisites in when prerequisites is supplied as a string', function(){
            var mr = new MakeRule('targetName', 'preq1 preq2');
            var makeRuleString = mr.buildRuleString();
            var actualPrerquisitesString = makeRuleString.match(/.+:\s(.+)/)[1];

            assert.strictEqual(actualPrerquisitesString, 'preq1 preq2');
        });

        it('should correctly build build prerequisites in when prerequisites is supplied as an array', function(){
            var mr = new MakeRule('targetName', [
                'what',
                'is',
                'it'
            ]);

            var makeRuleString = mr.buildRuleString();
            var actualPrerquisitesString = makeRuleString.match(/.+:\s(.+)/)[1];

            assert.strictEqual(actualPrerquisitesString, 'what is it');
        });

        it('should correctly insert tabs before each command', function(){
            var mr = new MakeRule('targetName', 'its a building', [
                'command1',
            ]);

            var makeRuleString = mr.buildRuleString();
            var actualCommandString = makeRuleString.match(/.+\n(.+)\n+/)[1];
            assert.strictEqual(actualCommandString, '\tcommand1');
        });

        it('should correctly build muliple commands', function(){
            var mr = new MakeRule('targetName', 'its a building', [
                'need',
                'a',
                'bigger',
                'boat'
            ]);

            var makeRuleString = mr.buildRuleString();
            var actualCommandStrings = [];

            var match;
            var re = new RegExp(/\t(.+)+/g);
            while ((match = re.exec(makeRuleString)) != null) {
                actualCommandStrings.push(match[1]);
            }

            assert.deepStrictEqual(actualCommandStrings, [
                'need', 'a', 'bigger', 'boat'
            ]);
        });
    });
});
