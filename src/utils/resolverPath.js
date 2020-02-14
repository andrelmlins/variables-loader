"use strict";

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolverPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = resolverPath;
