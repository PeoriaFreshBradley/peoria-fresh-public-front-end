// holds the number of people in the current household and the current list of produce during a survey session

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { miniReqArr } from "models/mini-req.model";

interface RequestState {
  numPeople: Number;
  reqList: miniReqArr; // this list keeps track of requests from the patron produce page
  foodbankReqList: miniReqArr; // this list keeps track of the requests that are being made with the foodbank produce page
}

interface RequestStateJustNum {
  numPeople: Number;
}

interface RequestStateJustList {
  reqList: miniReqArr;
}

// Define the initial state using that type
const initialState: RequestState = {
  numPeople: 0,
  reqList: [],
  foodbankReqList: [],
};

export const requestInfo = createSlice({
  name: "requestInfo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRequestInfo: (state, action: PayloadAction<RequestState>) => {
      state.numPeople = action.payload.numPeople;
      state.reqList = action.payload.reqList;
      state.foodbankReqList = action.payload.foodbankReqList;
    },
    setNumPeople: (state, action: PayloadAction<RequestStateJustNum>) => {
      state.numPeople = action.payload.numPeople;
    },
    setReqList: (state, action: PayloadAction<RequestStateJustList>) => {
      state.reqList = action.payload.reqList;
    },
    setFoodbankReqList: (state, action: PayloadAction<RequestStateJustList>) => {
      state.foodbankReqList = action.payload.reqList;
    },
    setRequestReset: (state) => {
      state.numPeople = 0;
      state.reqList = [];
      state.foodbankReqList = [];
    },
  },
});

export const { setRequestInfo, setNumPeople, setRequestReset, setReqList, setFoodbankReqList } =
  requestInfo.actions;

export default requestInfo.reducer;
