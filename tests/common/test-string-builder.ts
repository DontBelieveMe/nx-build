import * as assert from 'assert';

import { StringBuilder } from '../../src/common/string-builder';

describe('StringBuilder', () => {
    describe('#append()', () => {
        it('should concatenate strings two strings together', () => {
            let sb: StringBuilder = new StringBuilder();
            sb.append('str1');
            sb.append('str2');
            
            assert.strictEqual('str1str2', sb.toString());
        });

        it('should add an empty string when string parameter is undefined, null or not specified', () => {
            let sb: StringBuilder = new StringBuilder();
            sb.append(undefined);
            sb.append(null);
            sb.append();

            assert.strictEqual('', sb.toString());
        });
    });

    describe('#appendLine()', () => {
        it('should append the specified string followed by a newline to the end of the string', () => {
            let sb: StringBuilder = new StringBuilder();
            sb.appendLine('helloWorld');
            sb.appendLine('nextLine');

            assert.strictEqual('helloWorld\nnextLine\n', sb.toString());
        });

        it('should append a single newline when the input parameter is undefined or null', () => {
            let sb: StringBuilder = new StringBuilder();
            sb.appendLine(undefined);
            sb.appendLine(null);
            sb.appendLine();

            assert.strictEqual('\n\n\n', sb.toString());
        });
    });
});