// holds authentication information

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {instance as axios} from "axios-instance";

interface UserState {
  // will need to add the refresh token here when that workflow gets implemented
  authToken: string;
  gardenAuthorized: boolean;
  foodBankAuthorized: boolean;
  userObj: {
    id: number | null;
    gardenerProfile?: {
      name: string;
      bio?: string;
      visibility: string;
    };
    foodBankProfile?: {
      name: string;
    };
    email: string;
  };
}

// Define the initial state using that type
const initialState: UserState = {
  authToken: "",
  gardenAuthorized: false,
  foodBankAuthorized: false,
  userObj: {
    id: null,
    email: "",
  },
};

export const userSlice = createSlice({
  name: "userStatus",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserState>) => {
      axios.defaults.headers.common["Authorization"] = `bearer: ${action.payload.authToken}`;
      state.authToken = action.payload.authToken;
      state.userObj = action.payload.userObj;
      state.gardenAuthorized = action.payload.gardenAuthorized;
      state.foodBankAuthorized = action.payload.foodBankAuthorized;
    },
    setGardenerName: (state, action: PayloadAction<any>) => {
      if(state.userObj.gardenerProfile) state.userObj.gardenerProfile.name = action.payload;
    },
    setFoodBankProfileName: (state, action: PayloadAction<any>) => {
      if(state.userObj.foodBankProfile) state.userObj.foodBankProfile.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<any>) => {
      state.userObj.email = action.payload;
    },
  },
});

export const { setAuth, setGardenerName, setFoodBankProfileName, setEmail } = userSlice.actions;

export default userSlice.reducer;
