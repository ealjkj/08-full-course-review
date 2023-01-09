function set(obj, path, value) {
  const props = path.split(".");
  const lastProp = props[props.length - 1];
  const pathProps = props.slice(0, props.length - 1);

  let currentObj = obj;
  for (let prop of pathProps) {
    currentObj[prop] = {};
    currentObj = currentObj[prop];
  }

  currentObj[lastProp] = value;
}

const obj = { name: "jorge", wife: "adriana" };
set(obj, "path.to.deeply.nested.property", 42);

console.log(obj.path.to.deeply.nested.property);
