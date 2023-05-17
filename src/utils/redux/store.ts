import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./idSlice";

const store = configureStore({
  reducer: { id: idReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;