const { getOptions } = require('loader-utils');
const resolverPath = require('./utils/resolverPath');
const compilerVariables = require('./compilerVariables');
const replaceMask = require('./utils/replaceMask');
const createMask = require('./utils/createMask');
const runFunctions = require('./utils/runFunctions');
const fs = require('fs');

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
