import * as assert from 'assert';

import * as fileutils from '../../src/common/file-utils';

describe('file-utils', () => {
    describe('#normalizeExtension()', () => {
        it('should remove the leading dot from an extension with a dot', () => {
            let ext: string = fileutils.normalizeExtension('.exe');

            assert.strictEqual(ext, 'exe');
        });

        it('should do nothing to a extension without a leading dot', () => {
            let ext: string = fileutils.normalizeExtension('cpp');
            
            assert.strictEqual(ext, 'cpp');
        });

        it('should return undefined for undefined or null input', () => {
            let ext: string = fileutils.normalizeExtension(undefined);
            assert.strictEqual(ext, undefined);

            ext = fileutils.normalizeExtension(null);
            assert.strictEqual(ext, undefined);
        });
    });

});
