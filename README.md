# Variables loader

Webpack loader to parse variables

[![npm version](https://badge.fury.io/js/variables-loader.svg)](https://www.npmjs.com/package/variables-loader) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andrelmlins/variables-loader/blob/master/LICENSE) [![Build Status](https://travis-ci.com/andrelmlins/variables-loader.svg?branch=master)](https://travis-ci.com/andrelmlins/variables-loader)

## Install

```
npm install variables-loader
```

or

```
yarn add variables-loader
```

## Usage

**env.js**

```js
module.exports = () => {
  return {
    URL: "http://www.example.com"
  };
};
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ["variables-loader"]
      }
    ]
  }
};
```

## Options

### `fileName`

Type `String|Function` Default: `env.js`

### `format`

Type `String<js,json,txt>|Function<js,json,env>` Default: `js`

### `marker`

Type `String|Function|Array` Default: `[[]]`

## NPM Statistics

Download stats for this NPM package

[![NPM](https://nodei.co/npm/variables-loader.png)](https://nodei.co/npm/variables-loader/)

## License

Variables Loader is open source software [licensed as MIT](https://github.com/andrelmlins/variables-loader/blob/master/LICENSE).
