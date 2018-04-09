const fileutils = module.exports;


fileutils.cppFileExtensions = [
    'C', 'CPP', 'cpp', 'cxx', 'cp', 'c++', 'cc'
];

fileutils.cFileExtensions = [
    'c'
];

fileutils.asmFileExtensions = [
    'S', 's', 'asm'
];

fileutils.validSourceExtensions = fileutils.cppFileExtensions.concat(fileutils.cFileExtensions).concat(fileutils.asmFileExtensions);

// We normalize file extensions to have no dot in them
// for example, for the input '.exe' -> 'exe' is returned
// but for 'exe' -> 'exe' is just returned.
fileutils.normalizeExtension = function(ext) {
    if(ext.charAt(0) == '.') {
        return ext.substring(1);
    }

    return ext;
}

fileutils.isCppExtension = function(ext) {
    return fileutils.cppFileExtensions.includes(fileutils.normalizeExtension(ext));
}

fileutils.isCExtension = function(ext) {
    return fileutils.cFileExtensions.includes(fileutils.normalizeExtension(ext));
}

fileutils.isASMExtension = function(ext) {
    return fileutils.asmFileExtensions.includes(fileutils.normalizeExtension(ext));
}
