"use strict";

const fs = require("fs");

const compilerVariables = (path, extension) => {
  if (extension === "js") {
    return require(path)();
  } else {
    return fs.readFileSync(path);
  }
};

module.exports = compilerVariables;
