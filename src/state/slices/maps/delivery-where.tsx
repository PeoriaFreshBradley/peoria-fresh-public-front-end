import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressType } from "components/maps";
import { miniReq } from "models/mini-req.model";
import { GrowingWithYield } from "views/dashboard";


interface DeliveryState {
  whatGoesWhere: any;
}

const initialState: DeliveryState = {
  whatGoesWhere: {},
};

export interface LocGrowParam {
  location: AddressType;
  growing: GrowingWithYield;
};

export interface LocReqParam {
  location: AddressType;
  req: miniReq;
};

export const deliverySlice = createSlice({
  name: "deliveryLocationList",
  initialState,
  reducers: {
    setWhatGoesWhere: (state: DeliveryState, action: PayloadAction<Map<string, Set<GrowingWithYield>>>) => {
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
    addGrowingToLoc: (state: DeliveryState, action: PayloadAction<LocGrowParam>) => {
      if (state.whatGoesWhere[JSON.stringify(action.payload.location)] === undefined) {
        state.whatGoesWhere[JSON.stringify(action.payload.location)] = [action.payload.growing];
      }
      else {
        let tmp = state.whatGoesWhere[JSON.stringify(action.payload.location)];
        tmp = new Set<GrowingWithYield>(tmp);
        tmp.add(action.payload.growing);
        state.whatGoesWhere[JSON.stringify(action.payload.location)] = Array.from(tmp);
      }
    },
    removeGrowingOnLoc: (state: DeliveryState, action: PayloadAction<LocGrowParam>) => {
      let tmp = state.whatGoesWhere[JSON.stringify(action.payload.location)] as Array<GrowingWithYield>;
      let tmpSet = new Set<GrowingWithYield>();
      for (let i of tmp) {
        let destruct = {...i}; // this whole workaround is required because otherwise it just gives Proxies to all the objects and I can't compare them.
        if (destruct.growing.id === action.payload.growing.growing.id) continue;
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

export const { setWhatGoesWhere, addGrowingToLoc, removeGrowingOnLoc, removeDeliveryLocation, resetWhatGoesWhere } =
  deliverySlice.actions;

export default deliverySlice.reducer;
