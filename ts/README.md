moonsun - ts
===

This project contains the game's TypeScript sources.

For the time being I have this Visual Studio project to edit the sources.
I might change my workflow later to edit and process TypeScript files in the [public](../public) project, making moonsun-ts obsolete but I dunno.


Installation
---
```
npm install
tsd reinstall -so
```

`tsd` will install all the required TypeScript definition files for the libraries in `typings`. It will also create `typing\tsd.d.ts` that can be included in TypeScript files. Talking of `typing\tsd.d.ts`, the definition file for Typed-React has to be included manually because it doesn't exist (yet). Add this line:

`/// <reference path="../public/node_modules/typed-react/dist/typed-react.d.ts" />`

As a convenience for myself, I create a link to the public project folder in order to make it easily accessible in Visual Studio as part of the project.

```
mklink /D public ../public
```


Development
---

The TypeScript Build in Visual Studio is set up like this:

* Compile on save
* Module system: `CommonJS`
* Redirect JavaScript output to directory: `..\public`

Files compiled by TypeScript will end up in the [public](../public) project to be processed by webpack.
