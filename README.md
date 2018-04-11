# nx-build - A Javascript based project file generator
#### (Because you know JavaScript gets everywhere else these days)
[![Build Status](https://travis-ci.org/DontBelieveMe/nx-build.svg?branch=master)](https://travis-ci.org/DontBelieveMe/nx-build) [![Coverage Status](https://coveralls.io/repos/github/DontBelieveMe/nx-build/badge.svg?branch=master)](https://coveralls.io/github/DontBelieveMe/nx-build?branch=master)

## Usage
In the root tree of the project add a `nxbuild.json` file that describes the project.  
For example, for the project structure
```
hello-world/
├── src/
├     ├── main.c
├     ├── impl.c
├── include/
├     ├── main.h
├── nxbuild.json
```
  
nxbuild.json
```json
{
    "buildDir": "build", 
 
    "srcFiles": [
        "src/main.c",
        "src/impl.c"
    ],
    "headerFiles": [
        "include/main.h"
    ],

    "includeDirs": [
        "include"
    ],
    "compilerFlags": "-Wall -Werror -Wpedantic",
    "targetName": "helloWorld",
    "targetType": "executable"
}
```
  - Then run `nxbuild.js` in the root directory of the project
  - This will generate a `build` folder in the root which will contain the Makefile, object files and target file (executable, library etc...)
  - Run `cd build && make && cd ..` from the root directory to build the project.
  - And hey presto, a target file.
