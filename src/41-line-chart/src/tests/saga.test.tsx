import { expectSaga } from "redux-saga-test-plan";
import { chartSaga } from "../sagas";

const testSubscribe = (emitter: any, end: () => void) => {
  let secs = 3;
  const iv = setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      emitter(secs * secs);
    } else {
      // this causes the channel to close
      end();
    }
  }, 1);
  // The subscriber must return an unsubscribe function
  return () => {
    clearInterval(iv);
  };
};

describe("chartSaga", () => {
  const mockState = {
    populatorData: { "test-id": { x: [], y: [] } },
  };

  it("should dispatch initiateData and changeData", () => {
    return expectSaga(chartSaga, "test-id", testSubscribe)
      .withState(mockState)
      .run()
      .then((value) =>
        expect(value.effects.put.map((el) => el.payload.action.type)).toEqual([
          "populatorData/initiateData",
          "populatorData/changeData",
          "populatorData/changeData",
        ])
      );
  });

  it("should changeData, with new data: y=4 and y=1", () => {
    return expectSaga(chartSaga, "test-id", testSubscribe)
      .withState(mockState)
      .run()
      .then((value) => {
        const changeDataActions = value.effects.put.filter(
          (el) => el.payload.action.type === "populatorData/changeData"
        );

        expect(
          changeDataActions.map((el) => el.payload.action.payload.data)
        ).toEqual([
          { x: [""], y: [4] },
          { x: [""], y: [1] },
        ]);
      });
  });
});
