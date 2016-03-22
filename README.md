### What's this

Sketcher is a 'work in progress' idea that allow you to create a Framer prototype starting from your Sketch design.
You can design with Sketch and add animations and interactions with Framer and it's all automated using Webpack, Gulp and BrowserSync.

### Requirements

* Node.js
* Gulp
* Webpack
* sketch-tool (if you want to use it, there is a gulp task)
* Sketch.app

### Installation

1. Install sketch-tool via [brew](http://brew.sh/):
    1.1 Make sure you have Homebrew version `0.9.5` or higher. You can check with `$ brew --version`
    1.2                               If you don't have [Homebrew Cask](http://caskroom.io/), run `brew tap caskroom/cask`
    1.3 Install sketch-tool with `brew cask install sketch-tool`

2. Download and install [Framer Generator](http://framerjs.com/assets/static/downloads/Framer.zip)

3. Run `$ npm install`. At the moment it takes a lot to install and build Framer JS via Github, there should be a better solution (I had some problems with npm version of the library)

### Usage

1. Run `$ gulp`
2. Work on and save either `src/app.coffee` or `src/assets.sketch`
3. Import with framer generator or use `$ gulp:sketch` to use sketch-tool
4. You can create modules in the `src/modules` folder and `src/modules` them in your `app.coffee`

### Plus: Heroku deployment

You need an active [Heroku account](https://heroku.com), then you can install heroku-toolbelt.
`$ brew install heroku-toolbelt`
`$ heroku login`
`$ cd *your-app-folder*``

Create the app and start a Git repository.
`$ git init`
`$ git add .`
`$ git commit -am "starting!"`
`$ heroku create *app-name*`
`$ git push heroku master`

We serve static files using [Harp](http://harpjs.com/), we use a super simple configuration but if you want to learn more, just take a look at the [documentation](http://harpjs.com/docs/). You can modify the sample `_harp.json`.
