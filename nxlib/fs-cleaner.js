
const verify = require('./verify')
const fs = require('fs');
const path = require('path');

/**
 * Performs some generic file system sanitization,
 * such as cleaning the build directory, creating it if
 * nessersary etc...
 */
class FileSystemCleaner {
    deleteFolder(path) {
        verify.isOfType(path, verify.TYPE_STRING);

        if(!path.existsSync(path))
            return;

        var folderContents = fs.readdirSync(path);

        folderContents.forEach(file => {
            var currentPath = path.join(path, file);
            var isDirectory = fs.lstatSync(currentPath).isDirectory();

            if(isDirectory) {
                deleteFolder(currentPath);
            } else {
                fs.unlinkSync(currentPath);
            }
        });

        fs.rmdirSync(path);
    };

    createBuildDirectory(buildDirName) {
        verify.isOfType(buildDirName, verify.TYPE_STRING);

        if(!fs.existsSync(buildDirName)) {
            fs.mkdirSync(buildDirName);
        }
    }

    cleanBuildDirectory(buildDirName) {
        verify.isOfType(buildDirName, verify.TYPE_STRING);

        if(fs.existsSync(buildDirName)) {
            deleteFolder(buildDirName);
        }
    }
};

module.exports = FileSystemCleaner;