import { take, put, call, fork, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import { Unsubscribe } from "redux-saga";
import { faker } from "@faker-js/faker";
import populatorDataSlice, {
  changeData,
  initiateData,
} from "./slices/populatorData.slice";
import { store } from "./store";

type SubscribeChart = (
  emitter: (input: any | END) => void,
  end: () => void
) => Unsubscribe;

// Test function
function subscribeFunction(emitter: any, end: () => void) {
  let secs = 200;
  const iv = setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      emitter(faker.datatype.number({ min: -1000, max: 1000 }));
    } else {
      // this causes the channel to close
      end();
    }
  }, 100);
  // The subscriber must return an unsubscribe function
  return () => {
    clearInterval(iv);
  };
}

export function createChannel(subscribe: SubscribeChart) {
  return eventChannel((emitter) => subscribe(emitter, () => emitter(END)));
}

export function* chartSaga(
  id: string,
  subscribe: SubscribeChart
): Generator<any> {
  const chan = createChannel(subscribe);
  yield put(initiateData({ id }));

  while (true) {
    let info: any = yield take(chan);
    let label: string, value: number;
    if (Array.isArray(info)) {
      [label, value] = info;
    } else {
      label = "";
      value = info;
    }

    const populatorData: any = yield select(
      (state: any) => state.populatorData
    );
    const data = populatorData[id];
    let newData = { x: [...data.x, label], y: [...data.y, value] };

    if (data.x.length >= 100) {
      newData = {
        x: [...data.x.slice(1), label],
        y: [...data.y.slice(1), value],
      };
    }

    yield put(changeData({ id, data: newData }));
  }
}

export default function* saga() {
  yield fork(chartSaga, "1", subscribeFunction);
}
