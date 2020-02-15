"use strict";

const createMask = (marker, key) => {
  const first = marker.slice(0, marker.length / 2 - 1);
  const last = marker.replace(first, "");

  return `${first}${key}${last}`;
};

module.exports = createMask;
