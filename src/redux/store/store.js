import { configureStore } from "@reduxjs/toolkit";
import quizeReducer from "../reduxReducer/AddQuizes/addQuizeSlice";
import courseReducer from "../reduxReducer/AddCourses/allCoursesSlicer";

const store = configureStore({
  reducer: {
    quizeReducer,
    courseReducer,
  },
});

export default store;
