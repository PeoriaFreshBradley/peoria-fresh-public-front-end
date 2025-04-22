// this slice deals with all the tickets a specific gardener
// tracks each status (accepted planted scheduled delivered) individually

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delivery } from "../../models/delivery.model";

interface DeliveryState {
  deliveries: Delivery[];
  // donated: Delivery[];
  // grown: Delivery[];
}

const initialState: DeliveryState = {
  deliveries: [],
  // donated: [],
  // grown: [],
};

export const deliverySlice = createSlice({
  name: "deliveryList",
  initialState,
  reducers: {
    // setDonated: (state: DeliveryState, action: PayloadAction<Delivery[]>) => {
    //   state.donated = action.payload;
    // },
    // setGrown: (state: DeliveryState, action: PayloadAction<Delivery[]>) => {
    //   state.grown = action.payload;
    // }
    setDeliveries: (state: DeliveryState, action: PayloadAction<Delivery[]>) => {
      state.deliveries = action.payload;
    },
  },
});

export const { setDeliveries } =
  deliverySlice.actions;

export default deliverySlice.reducer;
