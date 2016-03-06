### What's this

First things first is a 'work in progress' idea that needs to be improved a lot.

It's a boilerplate project that you can use to start your UX prototype using Framer JS and Sketch.
You can design with Sketch and add animations and interactions with Framer and it's all automated using Webpack, Gulp and BrowserSync.

### Requirements

* Node.js
* Sketch.app
* sketch-tool

### Installation

1. Install sketch-tool
    * via [brew](http://brew.sh/):
      1. Make sure you have Homebrew version `0.9.5` or higher. You can check with `$ brew --version`
      2. If you don't have [Homebrew Cask](http://caskroom.io/), run `brew tap caskroom/cask`
      3. Install sketch-tool with `brew cask install sketch-tool`
2. Run `$ npm install`. At the moment it takes a lot to install and build Framer JS via Github, there should be a better solution

### Usage

1. Run `$ gulp`
2. Work on and save either `src/app.coffee` or `src/assets.sketch`
3. You can create modules in the `src/modules` folder
