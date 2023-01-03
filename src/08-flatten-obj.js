const imperativeFlatten = (obj, parentName) => {
  const newObj = {};
  for (let key in obj) {
    if (
      typeof obj[key] !== "object" ||
      obj[key] === undefined ||
      obj[key] instanceof Array
    ) {
      newObj[`${parentName}_${key}`] = obj[key];
    } else {
      const flattenChild = imperativeFlatten(obj[key], key);
      for (let keyOfChild in flattenChild) {
        newObj[`${parentName}_${keyOfChild}`] = flattenChild[keyOfChild];
      }
    }
  }

  return newObj;
};

const functionalFlatten = (obj, parentName) => {
  const isObject = (instance) => typeof instance === "object";
  const isUndefined = (obj) => obj === undefined;
  const isArray = (obj) => obj instanceof Array;

  const isFlatten = (instance) =>
    !isObject(instance) || isUndefined(instance) || isArray(instance);

  const prefixKeys = (obj, parentName) => {
    const newObj = {};
    for (let key in obj) {
      newObj[`${parentName}_${key}`] = obj[key];
    }
    return newObj;
  };

  // Main loop
  let newObj = {};
  for (key in obj) {
    if (isFlatten(obj[key])) {
      newObj[`${parentName}_${key}`] = obj[key];
    } else {
      const flattenChild = functionalFlatten(obj[key], key);
      newObj = { ...newObj, ...prefixKeys(flattenChild, parentName) };
    }
  }

  return newObj;
};

module.exports = { imperativeFlatten, functionalFlatten };
