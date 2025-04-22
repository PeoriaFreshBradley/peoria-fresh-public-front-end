// this slice deals with all the tickets a specific gardener
// tracks each status (accepted planted scheduled delivered) individually

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressType, toShortAddress } from "components/maps";

interface LocationState {
  locations: string;
}

const initialState: LocationState = {
  locations: "[]",
};

export const locSlice = createSlice({
  name: "locationsLists",
  initialState,
  reducers: {
    setLocations: (state: LocationState, action: PayloadAction<string>) => {
        state.locations = action.payload;
    },
    addLocation(state: LocationState, action: PayloadAction<AddressType>) {
        let locCopy = new Set<string>(JSON.parse(state.locations).map((i:AddressType) => { return JSON.stringify(i);}));
        locCopy.add(JSON.stringify(action.payload));
        let tmp = JSON.stringify(Array.from(Array.from(locCopy).map((i:string) => {return JSON.parse(i) as AddressType;})));
        state.locations = tmp;
    },
    removeLocation(state: LocationState, action: PayloadAction<AddressType>) {
        let locCopy = new Set<string>(JSON.parse(state.locations).map((i:AddressType) => { return JSON.stringify(i);}));
        locCopy.delete(JSON.stringify(action.payload));
        let tmp = JSON.stringify(Array.from(Array.from(locCopy).map((i:string) => {return JSON.parse(i) as AddressType;})));
        console.log(tmp);
        state.locations = tmp;
    },
  },
});

export const { setLocations, addLocation, removeLocation } =
  locSlice.actions;

export default locSlice.reducer;
