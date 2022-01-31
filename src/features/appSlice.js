import {createSlice } from '@reduxjs/toolkit';


export const appSlice = createSlice({
  name: 'app',
  initialState :{
    value: 0,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  
});

export const {incrementByAmount } = appSlice.actions;

export const selectApp = (state) => state.app.value;



export default appSlice.reducer;
