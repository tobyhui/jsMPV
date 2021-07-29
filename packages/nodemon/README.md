# @toby-mpv/nodemon

@toby-mpv/nodemon is mini-clone for nodemon


# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install -g @toby-mpv/nodemon
```

And @toby-mpv/nodemon will be installed globally to your system path.

You can also install @toby-mpv/nodemon as a development dependency:

```bash
npm install --save-dev @toby-mpv/nodemon
```

# Usage
Using nodemon is simple, if my application accepted a host and port as the arguments, I would start it as so:

```bash
t-nodemon ./lib/server.js -w ./lib
```