(function (global) {
  let root = document.getElementById("results");

  const originalSetTimeout = setTimeout;

  setTimeout = async (cb, time, ...args) => {
    let r = root;

    const fun = () => {
      root = r;
      cb(...args);
    };
    return originalSetTimeout(fun, time);
  };

  const result = (text, pass) => {
    const el = document.createElement("li");
    el.textContent = text;
    pass !== undefined && (el.style.color = pass ? "green" : "red");
    return el;
  };
  const assert = (pass, message) => {
    return root.appendChild(result(message, pass));
  };
  function test(description, testBlock) {
    const parent = root;
    root = assert(undefined, description).appendChild(
      document.createElement("ul")
    );
    testBlock();
    root = parent;
  }
  global.assert = assert;
  global.test = test;
})(window);
