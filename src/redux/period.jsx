import { createSlice } from "@reduxjs/toolkit";

export const periodSlice = createSlice({
  name: "period",
  initialState: {
    period: {
      value: 6,
      label: "1 Day",
    },
  },
  reducers: {
    changePeriod: (state, action) => {
      state.period.value = action.payload;
    },
    changeLabel: (state, action) => {
      state.period.label = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changePeriod, changeLabel } = periodSlice.actions;

export default periodSlice.reducer;
