import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebar: false,
};
const toggleDrawerSlice = createSlice({
  name: "toggledrawer",
  initialState,
  reducers: {
    toggleDrawer: (state, { payload }) => {
      state.isSidebar = payload;
    },
  },
});

export const { toggleDrawer } = toggleDrawerSlice.actions;

export const getIsSideBar = (state) => state.toggleDrawer.isSidebar;

export default toggleDrawerSlice.reducer;
