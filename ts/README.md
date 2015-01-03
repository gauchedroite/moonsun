moonsun - ts
===

This project contains the game's TypeScript sources.

For the time being I have this Visual Studio project to edit the sources.
I might change my workflow later to edit and process TypeScript files in the [public](../public) project, making moonsun-ts obsolete but I dunno.


Installation
---
```
npm install
tsd query react --action install
```

This will install `react.d.ts` in `typings/react`.

As a convenience I also create a link to the public project folder in order to make it easily accessible in Visual Studio as part of the project.

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
