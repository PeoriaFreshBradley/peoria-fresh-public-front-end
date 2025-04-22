// this slice holds the open tickets that show up in the gardener tab

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "../../models/ticket.model";

interface TicketsState {
  tickets: Ticket[];
  current?: Ticket;
  filters: any[];
}

const initialState: TicketsState = {
  tickets: [],
  filters: [],
};

export const ticketsSlice = createSlice({
  name: "ticketsList",
  initialState,
  reducers: {
    setTickets: (state: TicketsState, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    setFilters: (state: TicketsState, action: PayloadAction<any[]>) => {
      state.filters = action.payload;
    },
    addFilter: (state: TicketsState, action: PayloadAction<any>) => {
      state.filters.push(action.payload);
    },
    removeFilter: (state: TicketsState, action: PayloadAction<any>) => {
      state.filters = state.filters.filter(
        (filter) => Object.keys(filter)[0] !== Object.keys(action.payload)[0]
      );
    },
    clearFilters: (state: TicketsState) => {
      state.filters = [];
    },
    setCurrentTicket: (state: TicketsState, action: PayloadAction<Ticket>) => {
      state.current = action.payload;
    },
  },
});

export const {
  setTickets,
  setFilters,
  addFilter,
  removeFilter,
  clearFilters,
  setCurrentTicket,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
