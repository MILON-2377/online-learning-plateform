import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    subject: "",
    quizes: [{
        id: 1, 
        quizeName: "",
        options: [],
        correctOption: "",
    }],
};

export const quizeSlice = createSlice({
    name: "quizes",
    initialState,
    reducers : {
        addQuize : (state, action) => {

        },
    }
});

export const {addQuize} = quizeSlice.actions;
export default quizeSlice.reducer;