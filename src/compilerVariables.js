"use strict";

const fs = require("fs");
const dotenv = require("dotenv");
const jsonToDotNotate = require("./utils/jsonToDotNotate");

const compilerVariables = (path, format) => {
  if (format === "js") {
    const fileConfig = require(path);

    if (typeof fileConfig === "function") {
      return jsonToDotNotate(fileConfig());
    }

    return jsonToDotNotate(fileConfig);
  } else if (format === "env") {
    const file = fs.readFileSync(path);

    return dotenv.parse(file);
  }

  return jsonToDotNotate(
    JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))
  );
};

module.exports = compilerVariables;
