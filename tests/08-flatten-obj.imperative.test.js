const { imperativeFlatten } = require("../src/08-flatten-obj");

test("Flattening empty object", () => {
  const oldObj = {};
  const ans = {};
  const flattenImperative = imperativeFlatten(oldObj, "oldObj");
  expect(flattenImperative).toStrictEqual(ans);
});

test("Imperative flattening with undefined properties", () => {
  const oldObj = {
    name: undefined,
    gender: "Apache Attack Helicopter",
    address: {
      location: {
        city: undefined,
      },
    },
  };

  const ans = {
    oldObj_name: undefined,
    oldObj_gender: "Apache Attack Helicopter",
    oldObj_address_location_city: undefined,
  };

  const flattenImperative = imperativeFlatten(oldObj, "oldObj");
  expect(flattenImperative).toStrictEqual(ans);
});

test("Imperative flattening with null properties", () => {
  const oldObj = {
    name: null,
    gender: "Apache Attack Helicopter",
    address: {
      location: {
        city: null,
      },
    },
  };

  const ans = {
    oldObj_name: null,
    oldObj_gender: "Apache Attack Helicopter",
    oldObj_address_location_city: null,
  };

  const flattenImperative = imperativeFlatten(oldObj, "oldObj");
  expect(flattenImperative).toStrictEqual(ans);
});

test("Imperative flattening with arrays properties", () => {
  const oldObj = {
    name: ["juan", "perez"],
    gender: "Apache Attack Helicopter",
    address: {
      location: {
        city: ["CA", "LA"],
      },
    },
  };

  const ans = {
    oldObj_name: ["juan", "perez"],
    oldObj_gender: "Apache Attack Helicopter",
    oldObj_address_location_city: ["CA", "LA"],
  };

  const flattenImperative = imperativeFlatten(oldObj, "oldObj");
  expect(flattenImperative).toStrictEqual(ans);
});

test("Imperative flattening with multiple nest levels", () => {
  const oldObj = {
    name: "Sara",
    gender: "Apache Attack Helicopter",
    address: {
      location: {
        city: "SF",
        state: "CA",
      },
      preferredLocation: {
        city: "SF",
        state: ["CA", "MN"],
      },
      other: undefined,
    },
  };

  const ans = {
    oldObj_name: "Sara",
    oldObj_gender: "Apache Attack Helicopter",
    oldObj_address_location_city: "SF",
    oldObj_address_location_state: "CA",
    oldObj_address_preferredLocation_city: "SF",
    oldObj_address_preferredLocation_state: ["CA", "MN"],
    oldObj_address_other: undefined,
  };

  const flattenImperative = imperativeFlatten(oldObj, "oldObj");
  expect(flattenImperative).toStrictEqual(ans);
});
