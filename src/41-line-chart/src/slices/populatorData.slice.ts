import { createSlice } from "@reduxjs/toolkit";

type DataState = {
  [id: number]: { x: string[]; y: number[] };
};

const initialState: DataState = {};

const populatorDataSlice = createSlice({
  name: "populatorData",
  initialState,
  reducers: {
    changeData(state: DataState, action) {
      state[action.payload.id] = action.payload.data;
    },
    addData(state: DataState, action) {
      state[action.payload.id].x.push(action.payload.x);
      state[action.payload.id].y.push(action.payload.y);
    },
    initiateData(state: DataState, action) {
      state[action.payload.id] = { x: [], y: [] };
    },
  },
});

export const { changeData, addData, initiateData } = populatorDataSlice.actions;
export default populatorDataSlice.reducer;
