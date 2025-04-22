// holds the produce currently being displayed, the page the user is on, and any filters

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Produce } from "../../models/produce.model";
import { RootState } from "../store";

interface ProduceListState {
  produce: Produce[];
  filters: any[];
  page: number;
  pages: number;
  current?: Produce;
  numObjects: number;
}

// Define the initial state using that type
const initialState: ProduceListState = {
  produce: [],
  filters: [],
  page: 1,
  pages: 5,
  numObjects: 0,
};

interface ProduceInfoState {
  produce: Produce[];
  numObjects: number;
  pages: number;
}

export const produceListSlice = createSlice({
  name: "produceList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProduce: (state, action: PayloadAction<Produce[]>) => {
      state.produce = action.payload;
    },
    setProduceInfo: (state, action: PayloadAction<ProduceInfoState>) => {
      state.produce = action.payload.produce;
      state.numObjects = action.payload.numObjects;
      state.pages = action.payload.pages;
    },
    setFilters: (state, action: PayloadAction<any[]>) => {
      state.filters = action.payload;
    },
    addFilter: (state, action: PayloadAction<any>) => {
      state.filters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<any>) => {
      state.filters = state.filters.filter(
        (filter) => Object.keys(filter)[0] !== Object.keys(action.payload)[0]
      );
    },
    clearFilters: (state) => {
      state.filters = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPages: (state, action: PayloadAction<number>) => {
      state.pages = action.payload;
    },
    setCurrentProduce: (state, action: PayloadAction<Produce>) => {
      state.current = action.payload;
    },
    setNumObjects: (state, action: PayloadAction<number>) => {
      state.numObjects = action.payload;
    },
  },
});

export const {
  setProduce,
  setFilters,
  addFilter,
  removeFilter,
  clearFilters,
  setPage,
  setPages,
  setCurrentProduce,
  setNumObjects,
  setProduceInfo,
} = produceListSlice.actions;
export const selectFilters = (state: RootState) => state.produceList.filters;
export const selectProduce = (state: RootState) => state.produceList.produce;

export default produceListSlice.reducer;
