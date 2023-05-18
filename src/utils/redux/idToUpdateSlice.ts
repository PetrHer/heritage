import { createSlice } from "@reduxjs/toolkit";

const initialState: { idToUpdate: number } = {
  idToUpdate: 0,
};

export const idToUpdateSlice = createSlice({
  name: "idToUpdate",
  initialState,
  reducers: {
    setIdToUpdate(state, action:{payload:number,type:string}) {
      state.idToUpdate = action.payload;
    },
  },
});

export const { setIdToUpdate } = idToUpdateSlice.actions;
export default idToUpdateSlice.reducer;
