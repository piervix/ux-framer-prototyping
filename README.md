### What's this

A 'work in progress' idea that allow you to create a Framer prototype starting from your Sketch. Nothing new, but there is a plus.
You can design with Sketch, add animations and interactions with Framer and it's all automated using Gulp, Webpack and BrowserSync.

You can work in your Sketch file, add interactions in your CoffeeScript main app file, save and automagically have the animated prototype updated with the new code and images inside the build folder.

[Try Demo](https://framer-ux.herokuapp.com/)

[Read blog post](https://blog.prototypr.io/automate-your-ux-design-workflow-with-framer-js-gulp-and-sketch-cc2e8484e4b7#.yw2i6ophx)

### Requirements

* Node.js (tested with 4.4.1 LTS)
* Gulp
* Webpack
* Framer.js and Framer Generator
* sketch-tool (if you want to use it, there is a specific gulp task)
* Sketch.app

### Installation

1. Start by cloning this project
2. Install sketch-tool via [brew](http://brew.sh/):
    1. Make sure you have Homebrew version `0.9.5` or higher. You can check with `$ brew --version`
    2. If you don't have [Homebrew Cask](http://caskroom.io/), run `$ brew tap caskroom/cask`
    3. Install sketch-tool with `$ brew cask install sketch-tool`

3. Download and install latest version of [Framer Generator](http://builds.framerjs.com/)

4. Run `$ npm install`. At the moment it takes a lot to install and build Framer JS via Github, there should be a better solution (I had some problems with npm version of the library)

### Usage

1. Install gulp-cli `$ npm install gulp-cli -g` (but you can always use local version via npm scripts)
2. Run `$ gulp` or `$ npm start`
3. Work on and save either `src/app.coffee` or `src/assets.sketch`
4. Import with framer generator or use `$ gulp:sketch` to use sketch-tool
5. You can create modules in the `src/modules` folder and `src/modules` them in your `app.coffee`

### Gulp tasks
#### Clean

Run `$ gulp clean` to delete the entire build folder.
#### Watch

Run the default `$ gulp` task to watch our project folders, launch the server and enjoy live reload.

#### Build
Run `$ gulp build` to build our project and distribute.

#### Slices
Run `$ gulp --slices` to watch using **sketch-tool**.

### Heroku deployment

You need an active [Heroku account](https://heroku.com), then you can install heroku-toolbelt.

```
$ brew install heroku-toolbelt
$ heroku login
$ cd *your-app-folder*
```

Create the app and start a Git repository.

```
$ git init
$ git add .
$ git commit -am "starting!"
$ heroku create *app-name*
$ git push heroku master
```

We serve static files using [Harp](http://harpjs.com/), we use a super simple configuration but if you want to learn more, just take a look at the [documentation](http://harpjs.com/docs/). You can modify the sample `_harp.json`.
