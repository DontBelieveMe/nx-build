# nx-build - A JSON based Makefile generator 
#### (Because you know JavaScript gets everywhere else these days)
[![Build status](https://ci.appveyor.com/api/projects/status/uwf9a5ik1wtjpjwm?svg=true)](https://ci.appveyor.com/project/DontBelieveMe/nx-build)

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
