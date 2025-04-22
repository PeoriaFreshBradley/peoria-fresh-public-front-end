// holds info about a gardener's 'produce to be accepted' list while they are on the Community Needs page

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { miniReqArr } from "models/mini-req.model";

interface AcceptingState {
  reqList: miniReqArr;
}

// Define the initial state using that type
const initialState: AcceptingState = {
  reqList: [],
};

export const acceptingInfo = createSlice({
  name: "acceptingInfo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccepting: (state, action: PayloadAction<AcceptingState>) => {
      state.reqList = action.payload.reqList;
    },
    reset: (state) => {
      state.reqList = [];
    },
  },
});

export const { reset, setAccepting } =
  acceptingInfo.actions;

export default acceptingInfo.reducer;
