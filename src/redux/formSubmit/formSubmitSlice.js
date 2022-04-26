import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceData: {},
  endpointsData: [],
  isDownload: true,
};

const formSubmitSlice = createSlice({
  name: "formSubmit",
  initialState,
  reducers: {
    serviceFormData: (state, action) => {
      state.serviceData = action.payload;
    },
    endpointsFormData: (state, action) => {
      state.endpointsData.push(action.payload);
    },
    setIsDownload: (state, action) => {
      state.isDownload = action.payload;
    },
  },
});

export const { serviceFormData, endpointsFormData, setIsDownload } =
  formSubmitSlice.actions;

export const getServiceFormData = (state) => state.formSubmit.serviceData;

export const getEndPointsFormData = (state) => state.formSubmit.endpointsData;

export const getIsDownload = (state) => state.formSubmit.isDownload;

export default formSubmitSlice.reducer;
