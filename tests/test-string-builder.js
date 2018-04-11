var assert = require('assert');

var StringBuilder = require('../nxlib/string-builder.js');

describe('StringBuilder', function(){
    describe('#append()', function() {
        it('should add the specified string to the objects global state', function(){
            var sb = new StringBuilder();
            sb.append('str1');
            sb.append('str2');
            assert.equal('str1str2', sb.toString());
        });

        it('should add an empty string when string parameter is undefined or null', function(){
            var sb = new StringBuilder();
            sb.append(undefined);
            sb.append(null);
            assert.equal('', sb.toString());
        });
    });

    describe('#appendLine()', function(){
        it('should append the specified string followed by a newline', function(){
            var sb = new StringBuilder();
            sb.appendLine('helloWorld');
            sb.appendLine('nextLine');

            assert.equal('helloWorld\nnextLine\n', sb.toString());
        });
    });
});
