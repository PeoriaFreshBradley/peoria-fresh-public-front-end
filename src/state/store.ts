import { configureStore } from "@reduxjs/toolkit";
import produceListReducer from "./slices/produce-list-slice";
import ticketsReducer from "./slices/tickets-slice";
import growingReducer from "./slices/growing-slice";
import deliveryReducer from "./slices/delivery-slice";
import userReducer from './slices/user-slice';
import requestInfoReducer from './slices/request-info-slice';
import acceptingInfoReducer from "./slices/accepting-info-slice";
import locationsInfoReducer from './slices/maps/autocomplete';
import deliveryLocsInfoReducer from './slices/maps/delivery-where';
import donationDeliveryReducer from './slices/maps/donation-delivery';
import { loadState } from "../localStorage";


// this is here because userInfo used to be called authState,
// so a user who used the website before this change could still have authState in their local storage.
// Passing an object that doesn't match the current state shape as the preloadedState to the store will cause an error
if (loadState()?.authState !== undefined){

	localStorage.removeItem('appState');
}

let persistedState;
if(loadState() !== undefined) persistedState = loadState();

export const store = configureStore(
	{
		reducer: {
			produceList: produceListReducer,
			ticketsList: ticketsReducer,
			growingList: growingReducer,
			deliveryList: deliveryReducer,
			userInfo: userReducer,
			requestInfo: requestInfoReducer,
			acceptingInfo: acceptingInfoReducer,
			locationsList: locationsInfoReducer,
			deliveryLocsList: deliveryLocsInfoReducer,
			donationLocsList: donationDeliveryReducer,
		},
		preloadedState: persistedState
	}
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
