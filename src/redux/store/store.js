import { configureStore } from "@reduxjs/toolkit";
import quizeSlice from "../reduxReducer/AddQuizes/addQuizeSlice";

const store = configureStore({
    reducer:quizeSlice,
});

export default store;