import { createSlice } from "@reduxjs/toolkit";

export const daysSlice = createSlice({
  name: "Days",
  initialState: {
    days: {
      value: 30,
      label: "Month",
    },
  },
  reducers: {
    changeDays: (state, action) => {
      state.days.value = action.payload;
    },
    changeLabel: (state, action) => {
      state.days.label = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeDays, changeLabel } =daysSlice.actions;

export default daysSlice.reducer;
