import * as assert from 'assert';

import * as fileutils from '../../src/common/file-utils';

describe('file-utils', () => {
    describe('#normalizeExtension()', () => {
        it('should remove the leading dot from an extension with a dot', () => {
            let ext = fileutils.normalizeExtension('.exe');

            assert.strictEqual(ext, 'exe');
        });

        it('should do nothing to a extension without a leading dot', () => {
            let ext = fileutils.normalizeExtension('cpp');
            
            assert.strictEqual(ext, 'cpp');
        });
    });

});
