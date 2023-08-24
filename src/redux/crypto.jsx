import { createSlice } from "@reduxjs/toolkit";

export const cryptoSlice = createSlice({
  name: "Crypto",
  initialState: {
    coin: {
      value: "bitcoin",
    },
  },
  reducers: {
    changeCrypto: (state, action) => {
      state.coin.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
