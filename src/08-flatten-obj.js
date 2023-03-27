const imperativeFlatten = (obj, parentName) => {
  const newObj = {};
  for (let key in obj) {
    if (
      typeof obj[key] !== "object" ||
      obj[key] === undefined ||
      obj[key] === null ||
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
  const isNull = (obj) => obj === null;
  const isArray = (obj) => obj instanceof Array;

  const isFlatten = (instance) =>
    !isObject(instance) ||
    isUndefined(instance) ||
    isArray(instance) ||
    isNull(instance);

  const prefixKeys = (obj, parentName) => {
    return Object.keys(obj).reduce((prevObj, currentKey) => {
      return {
        ...prevObj,
        [`${parentName}_${currentKey}`]: obj[currentKey],
      };
    }, {});
  };

  // Trying to make Main loop as functional
  return Object.keys(obj).reduce((prevObj, currentKey) => {
    if (isFlatten(obj[currentKey])) {
      return { ...prevObj, [`${parentName}_${currentKey}`]: obj[currentKey] };
    }
    return {
      ...prevObj,
      ...prefixKeys(functionalFlatten(obj[currentKey], currentKey), parentName),
    };
  }, {});
};

module.exports = { imperativeFlatten, functionalFlatten };
