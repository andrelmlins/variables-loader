"use strict";

const replaceAll = (string, search, replace) =>
  string.split(search).join(replace);

module.exports = replaceAll;
