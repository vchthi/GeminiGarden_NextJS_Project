import { createSlice } from '@reduxjs/toolkit';


//khai báo 1 slice với tên couter
const counterSlice = createSlice({
    //tên slice
  name: 'counter',
  // giá trị ban đầu của state là 0
  initialState: 0,
  //các reducer là các action
  reducers: {
    //action tăng giá trị của state lên 1
    increment: (state) => state + 1,
     //action giảm giá trị của state lên 1
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
