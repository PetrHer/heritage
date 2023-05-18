import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./idSlice";
import privilegesReducer from "./privilegesSlice";
import idToUpdateReducer from "./idToUpdateSlice";

const store = configureStore({
  reducer: {
    id: idReducer,
    privileges: privilegesReducer,
    idToUpdate: idToUpdateReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
