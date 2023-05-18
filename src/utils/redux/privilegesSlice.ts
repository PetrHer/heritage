import { createSlice } from "@reduxjs/toolkit";

const initialState: { privileges: boolean } = {
  privileges:false,
};

export const privilegesSlice = createSlice({
  name: "privileges",
  initialState,
  reducers: {
    setPrivileges(state, action:{payload:boolean,type:string}) {
      state.privileges = action.payload;
    },
  },
});

export const { setPrivileges } = privilegesSlice.actions;
export default privilegesSlice.reducer;
