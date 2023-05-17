import { createSlice } from "@reduxjs/toolkit";

const initialState: { id: number } = {
  id: 1,
};

export const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId(state, action:{payload:number,type:string}) {
      state.id = action.payload;
    },
  },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;
