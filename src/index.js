const fs = require('fs');
const dotenv = require('dotenv');
const { getOptions } = require('loader-utils');
const resolverPath = require('./utils/resolverPath');
const replaceMask = require('./utils/replaceMask');
const createMask = require('./utils/createMask');
const runFunctions = require('./utils/runFunctions');
const jsonToDotNotate = require('./utils/jsonToDotNotate');

const compilerVariables = (path, format) => {
  if (format === 'js') {
    const fileConfig = require(path);

    if (typeof fileConfig === 'function') {
      return jsonToDotNotate(fileConfig());
    }

    return jsonToDotNotate(fileConfig);
  } else if (format === 'env') {
    const file = fs.readFileSync(path);

    return dotenv.parse(file);
  }

  return jsonToDotNotate(
    JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
  );
};

module.exports = function(source) {
  let optionsDefault = { fileName: 'env.js', format: 'js', marker: '[[]]' };
  let options = getOptions(this) || {};

  options = runFunctions({ ...optionsDefault, ...options });

  if (options.marker.length % 2 !== 0) {
    console.error(new Error('Marker is invalid'));
    process.exitCode(1);
  }

  const pathFileVariables = resolverPath(`${options.fileName}`);

  if (fs.existsSync(pathFileVariables)) {
    const dictionary = compilerVariables(pathFileVariables, options.format);

    if (source.search(/\[\[([^\[\[\]\]]+)\]\]/) > 0) {
      Object.keys(dictionary).forEach(key => {
        source = replaceMask(
          source,
          createMask(options.marker, key),
          dictionary[key]
        );
      });
    }

    return source;
  }

  return source;
};
