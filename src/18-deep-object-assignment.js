function set(obj, path, value) {
  const props = path.split(".");
  const lastProp = props[props.length - 1];
  const pathProps = props.slice(0, props.length - 1);

  let currentObj = obj;
  for (let prop of pathProps) {
    if (!Object.keys(currentObj).includes(prop)) {
      currentObj[prop] = {};
    }

    currentObj = currentObj[prop];
  }

  if (typeof currentObj !== "object" && typeof currentObj !== "function") {
    throw Error("Cannot assing a property to a non-object");
  }
  currentObj[lastProp] = value;
}

module.exports = set;
