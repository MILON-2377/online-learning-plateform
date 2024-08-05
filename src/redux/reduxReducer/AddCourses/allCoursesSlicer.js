const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  singleCourse: {},
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // single course handle
    addSingleCourse: (state, action) => {
      state.singleCourse = action.payload;
    },
  },
});

export const { addSingleCourse } = courseSlice.actions;
export default courseSlice.reducer;
