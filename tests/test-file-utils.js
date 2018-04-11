var assert = require('assert');

var fileutils = require('../nxlib/file-utils');

describe('file-utils', function(){
    describe('#normalizeExtension()', function(){
        it('should remove the leading dot from an extension with a dot', function(){
            let ext = fileutils.normalizeExtension('.exe');

            assert.strictEqual(ext, 'exe');
        });

        it('should do nothing to a extension without a leading dot', function(){
            let ext = fileutils.normalizeExtension('cpp');
            
            assert.strictEqual(ext, 'cpp');
        });

        it('should return undefined for undefined or null input', function(){
            let ext = fileutils.normalizeExtension(undefined);
            assert.strictEqual(ext, undefined);

            ext = fileutils.normalizeExtension(null);
            assert.strictEqual(ext, undefined);
        });
    });

    describe('#isCppExtension()', function(){
        it('should return true for a C++ extension with a dot', function(){
            let isCpp = fileutils.isCppExtension('.cc');
            assert.strictEqual(isCpp, true);
        });

        it('should return true for a C++ extension without a dot', function(){
            let isCpp = fileutils.isCppExtension('cpp');
            assert.strictEqual(isCpp, true);
        });

        it('should match any of the predefined valid C++ extensions', function(){
            let validExtensions = fileutils.cppFileExtensions;
            validExtensions.forEach((ext) => {
                let isCpp = fileutils.isCppExtension(ext);

                assert.strictEqual(isCpp, true);
            });
        });
    });

    describe('#isCExtension()', function(){
        it('should return true for a C extension with a dot', function(){
            let isC = fileutils.isCExtension('.c');
            assert.strictEqual(isC, true);
        });

        it('should return true for a C extension without a dot', function(){
            let isC = fileutils.isCExtension('c');
            assert.strictEqual(isC, true);
        });

        it('should match any of the predefined valid C extensions', function(){
            let validExtensions = fileutils.cFileExtensions;
            validExtensions.forEach((ext) => {
                let isC = fileutils.isCExtension(ext);

                assert.strictEqual(isC, true);
            });
        });
    });

    describe('#isASMExtension()', function(){
        it('should return true for a ASM extension with a dot', function(){
            let isASM = fileutils.isASMExtension('.S');
            assert.strictEqual(isASM, true);
        });

        it('should return true for a ASM extension without a dot', function(){
            let isASM = fileutils.isASMExtension('asm');
            assert.strictEqual(isASM, true);
        });

        it('should match any of the predefined valid ASM extensions', function(){
            let validExtensions = fileutils.asmFileExtensions;
            validExtensions.forEach((ext) => {
                let isASM = fileutils.isASMExtension(ext);

                assert.strictEqual(isASM, true);
            });
        });
    });
});
