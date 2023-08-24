/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import periodReducer from "./period";
import coinReducer from "./coin";
import daysReducer from "./days";
import cryptoReducer from "./crypto";

export default configureStore({
  reducer: {
    period: periodReducer,
    coin: coinReducer,
    crypto: cryptoReducer,
    days: daysReducer
  }
});

