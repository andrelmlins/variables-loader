"use strict";

const replaceAll = (string, search, replace) =>
  string.split(search).join(replace);

const replaceMask = (string, search, replace) => {
  if (Array.isArray(search)) {
    return search.map(item => replaceAll(string, search, replace));
  }

  return replaceAll(string, search, replace);
};

module.exports = replaceMask;
