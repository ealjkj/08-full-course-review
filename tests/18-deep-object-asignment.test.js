const set = require("../src/18-deep-object-assignment");

test("Set function creates a deep path and assigns a value to it", () => {
  const obj = { name: "jorge", wife: "adriana" };
  set(obj, "path.to.deeply.nested.property", 42);

  expect(obj).toStrictEqual({
    name: "jorge",
    wife: "adriana",
    path: { to: { deeply: { nested: { property: 42 } } } },
  });
});

test("Trying to assign a property to a number should fail", () => {
  const obj = { a: 1, b: [1, 2] };

  expect(() => set(obj, "a.c", 5)).toThrow();
});

test("Trying to assign a property to a number should fail on a deep path", () => {
  const obj = { a: 1, b: [1, 2] };

  expect(() => set(obj, "a.c.d", 5)).toThrow();
});

test("Changing the last value of a path", () => {
  const obj = { a: 1, b: [1, 2] };
  set(obj, "a", 5);

  expect(obj).toStrictEqual({ a: 5, b: [1, 2] });
});

test("Changing one value of the last element of the path", () => {
  const obj = { a: 1, b: [1, 2] };
  set(obj, "b.2", 3);

  expect(obj).toStrictEqual({ a: 1, b: [1, 2, 3] });
});
