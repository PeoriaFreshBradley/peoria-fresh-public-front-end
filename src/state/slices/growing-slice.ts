// this slice deals with all the tickets a specific gardener
// tracks each status (accepted planted scheduled delivered) individually

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Growing } from "../../models/growing.model";

interface GrowingState {
  accepted: Growing[];
  planted: Growing[];
  scheduled: Growing[];
  delivered: Growing[];
  current?: Growing;
}

const initialState: GrowingState = {
  accepted: [],
  planted: [],
  scheduled: [],
  delivered: [],
};

export const growingSlice = createSlice({
  name: "growingList",
  initialState,
  reducers: {
    setPlanted: (state: GrowingState, action: PayloadAction<Growing[]>) => {
      state.planted = action.payload;
    },
    setAccepted: (state: GrowingState, action: PayloadAction<Growing[]>) => {
      state.accepted = action.payload;
    },
    setScheduled: (state: GrowingState, action: PayloadAction<Growing[]>) => {
      state.scheduled = action.payload;
    },
    setDelivered: (state: GrowingState, action: PayloadAction<Growing[]>) => {
      state.delivered = action.payload;
    },
  },
});

export const { setPlanted, setAccepted, setScheduled, setDelivered } =
  growingSlice.actions;

export default growingSlice.reducer;
