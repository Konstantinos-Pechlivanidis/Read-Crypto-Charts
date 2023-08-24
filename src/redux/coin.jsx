import { createSlice } from "@reduxjs/toolkit";

export const coinSlice = createSlice({
  name: "Coin",
  initialState: {
    coin: {
      value: "eur",
    },
  },
  reducers: {
    changeCoin: (state, action) => {
      state.coin.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCoin } = coinSlice.actions;

export default coinSlice.reducer;
