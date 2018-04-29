# nx-build - A Javascript based project file generator
#### (Because you know JavaScript gets everywhere else these days)
[![Build Status](https://travis-ci.org/DontBelieveMe/nx-build.svg?branch=master)](https://travis-ci.org/DontBelieveMe/nx-build)
[![Coverage Status](https://coveralls.io/repos/github/DontBelieveMe/nx-build/badge.svg?branch=master)](https://coveralls.io/github/DontBelieveMe/nx-build?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Setup
 - Run `git clone https://github.com/DontBelieveMe/nx-build.git`
 - Navigate into that root directory
 - Run `npm install` to install all all npm dependencies
 - Now we can run the code by executing '`node index.js` 
 - For example to generate project files in the `examples/ex` folder run `node ../../index.js` from that directory.
 - This is generate project files in a `build` subdirectory. (This subfolder name is hardcoded for now).
 
## Usage

`nx-build` scripts are written in plain Javascript and have full access to the node ecosystem
 - Mostly - you can `require` all default node modules and any modules exposed by `nx-build`
 - At the moment you cannot install any external packages via `npm` or any other package manager.

In order to use `nx-build` create a `nx.build.js` file in the root of your project.  
A simple `nx.build.js` file may look like this

```js
var nx = require('nx');

var target = nx.createTarget();

target.setName('helloWorld');
target.setType('executable');

target.addSrcFile('src/main.c');

nx.addTarget(target);
```
 - `var nx = require('nx');` -> This will include the `nx` generator system API for you to use.
 - `var target = nx.createTarget()` -> This creates a new target. A target is a binary file that is either an executable, a static library or a shared library.
 - `target.setName('helloWorld');` -> Sets the name of the target, In this case the executable will be called `helloWorld`
 - `target.setType('executable');` -> Sets the type of the target, e.g executable, shared/static library. In this case it the source files are going to compile into a executable.
 - `target.addSrcFile('src/main.c');` -> Adds a source file to be compiled into the target. File paths such as these are all relative to the directory of the `nx.build.js`.
 - `nx.addTarget(target)` -> This finally will include target as part of that module. This will eventually allow for having multiple targets in one project.

That is the anatomy of a simple `nx.build.js` file. Of course, because they are scripted in JS, anything you can do in JS you can do in these scripts, for example conditionally add source files depending on the OS (exposed through Nodes `os` module), modify the filesystem (Nodes `fs` module), or even use the node `HTTP/HTTPS` API to download or upload files!

## Roadmap
 - Currently there are a few items that I believe are important to getting the project in a minimum usable state.
 - Be able to specify generator from command line (whilst it seems critical this is not supported currently :/)
 - Visual Studio project generation
 - Allowing a structure that supports 'subprojects' or adding external `nx-build` projects.
   - Like CMakes `add_directory` function
   - It would be really cool to be able to integrate this functionality with git submodules (e.g similar to Vim & Vundle) - Specify a GitHub address (`name/project`) and `nx-build` should clone that and integrate it.
 - All [Issues](https://github.com/DontBelieveMe/nx-build/issues)
