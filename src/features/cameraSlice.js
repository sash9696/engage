import {createSlice } from '@reduxjs/toolkit';


export const cameraSlice = createSlice({
  name: 'camera',
  initialState :{
    cameraImage: 0,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCameraImage: (state, action) => {
      state.value = action.payload;
    },
    resetCameraImage: (state) => {
        state.value = null;
    },
  },
  
});

export const {setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;



export default cameraSlice.reducer;
