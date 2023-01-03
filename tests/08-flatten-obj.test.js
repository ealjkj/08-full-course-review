const {
  imperativeFlatten,
  functionalFlatten,
} = require("../src/08-flatten-obj");

test("Example", () => {
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
  const flattenFunctional = functionalFlatten(oldObj, "oldObj");
  expect(flattenImperative).toStrictEqual(ans);
  expect(flattenFunctional).toStrictEqual(ans);
});
