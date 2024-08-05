const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  singleCourse: {},
  totalPrice:0,
  payment:false,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // single course handle
    addSingleCourse: (state, action) => {
      state.singleCourse = action.payload;
    },

    // add total price
    totalPriceHandle:(state, action) => {
      state.totalPrice = action.payload;
    },

    // payment success
    addPayment:(state,action) => {
      state.payment = action.payload;
    },

  },
});

export const { addSingleCourse, totalPriceHandle, addPayment} = courseSlice.actions;
export default courseSlice.reducer;
