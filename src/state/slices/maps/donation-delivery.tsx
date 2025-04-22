import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressType } from "components/maps";
import { miniReq } from "models/mini-req.model";

interface DeliveryState {
  whatGoesWhere: any;
}

const initialState: DeliveryState = {
  whatGoesWhere: {},
};

export interface LocReqParam {
  location: AddressType;
  req: miniReq;
};

export const donationDeliverySlice = createSlice({
  name: "deliveryLocationList",
  initialState,
  reducers: {
    setWhatGoesWhere: (state: DeliveryState, action: PayloadAction<Map<string, Set<miniReq>>>) => {
      let tmp = {} as any;
      action.payload.forEach((val, key) => {
        tmp[key] = [];
        for (let i of val) {
          tmp[key].push(i);
        }
        state.whatGoesWhere = tmp;
      });
      state.whatGoesWhere = action.payload;
    },
    addRequestToLoc: (state: DeliveryState, action: PayloadAction<LocReqParam>) => {
      if (state.whatGoesWhere[JSON.stringify(action.payload.location)] === undefined) {
        state.whatGoesWhere[JSON.stringify(action.payload.location)] = [action.payload.req];
      }
      else {
        let tmp = state.whatGoesWhere[JSON.stringify(action.payload.location)];
        tmp = new Set<miniReq>(tmp);
        tmp.add(action.payload.req);
        state.whatGoesWhere[JSON.stringify(action.payload.location)] = Array.from(tmp);
      }
    },
    removeRequestOnLoc: (state: DeliveryState, action: PayloadAction<LocReqParam>) => {
      let tmp = state.whatGoesWhere[JSON.stringify(action.payload.location)] as Array<miniReq>;
      let tmpSet = new Set<miniReq>();
      for (let i of tmp) {
        let destruct = {...i}; // this whole workaround is required because otherwise it just gives Proxies to all the objects and I can't compare them.
        if (destruct.id === action.payload.req.id) continue;
        else tmpSet.add(destruct);
      }
      state.whatGoesWhere[JSON.stringify(action.payload.location)] = Array.from(tmpSet);
    },
    removeDeliveryLocation: (state: DeliveryState, action: PayloadAction<AddressType>) => {
      delete state.whatGoesWhere[JSON.stringify(action.payload)];
    },
    resetWhatGoesWhere: (state: DeliveryState) => {
      state.whatGoesWhere = {};
    }
  },
});

export const { setWhatGoesWhere, addRequestToLoc, removeRequestOnLoc, removeDeliveryLocation, resetWhatGoesWhere } =
  donationDeliverySlice.actions;

export default donationDeliverySlice.reducer;
