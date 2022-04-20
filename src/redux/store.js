import { configureStore } from "@reduxjs/toolkit";

import toggleDrawerReducer from "./toggleDrawer/toggleDrawerSlice";
import formSubmitReducer from "./formSubmit/formSubmitSlice";

export const store = configureStore({
  reducer: {
    toggleDrawer: toggleDrawerReducer,
    formSubmit: formSubmitReducer,
  },
});
