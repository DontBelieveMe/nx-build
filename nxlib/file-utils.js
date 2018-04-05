const fileutils = module.exports;

fileutils.isCppExtension = function(ext) {
    return ext === '.cc' || ext === '.cpp' ||
           ext === '.cxx' || ext === '.CPP' ||
           ext === '.C' || ext === '.c++' ||
           ext === '.cp';
}

fileutils.isCExtension = function(ext) {
    return ext === '.c';
}

fileutils.isASMExtension = function(ext) {
    return ext === '.asm' || ext === '.S' || ext === '.s';
}
