"use strict";

const insertKey = (marker, key) => {
  const first = marker.slice(0, marker.length / 2 - 1);
  const last = marker.replace(first, "");

  return `${first}${key}${last}`;
};

const createMask = (marker, key) => {
  if (Array.isArray(marker)) {
    return marker.map(item => insertKey(item, key));
  }

  return insertKey(marker, key);
};

module.exports = createMask;
