moonsun - public
===

This project is the client side part of the game. 
It uses the excellent [webpack](https://github.com/webpack/webpack) module bundler that allows for the use of compact and powerful config files.


Installation
---

```
npm install
```

Development
---

There are 4 ways to start the development workflow. You specify which one from the `npm run` command: 

1. `npm run dev` creates the packages in `./build` and that's it. 

2. `npm run prod` creates the packages in `./dist` and that's it.

3. `npm run watch` creates the packages in `./build` and watches for any change in the sources to rebuild the packages.

In these cases you must use some web server to serve up the content. Use the one in the [server](../server) project.

The last case is `npm run hot`.
This creates the packages, watches for any change in the sources to rebuild the packages and reload the web page automatically.
Use `http://localhost:8080` for this.


Using TypeScript
---

The webpack scripts here don't deal with TypeScript because of the current state of the TypeScript loaders. 
No transpiling is done in these workflows, but of course this doesn't prevent us to use TypeScript anyway.

Have a look at the [ts](../ts) project for one solution.
