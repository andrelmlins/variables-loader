const { getOptions } = require("loader-utils");
const resolverPath = require("./utils/resolverPath");
const compilerVariables = require("./compilerVariables");
const replaceMask = require("./utils/replaceMask");
const createMask = require("./utils/createMask");

module.exports = source => {
  let options = getOptions(this) || {
    fileName: "env.js",
    format: "js",
    marker: "[[]]"
  };

  if (typeof options.fileName === "function") {
    options.fileName = options.fileName();
  }

  if (typeof options.format === "function") {
    options.format = options.format();
  }

  if (typeof options.marker === "function") {
    options.marker = options.marker();
  }

  if (marker.length % 2 !== 0) {
    console.error(new Error("Marker is invalid"));
    process.exitCode(1);
  }

  const pathFileVariables = resolverPath(`${options.fileName}`);

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
};
