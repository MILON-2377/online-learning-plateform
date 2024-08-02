import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  subject: "",
  quizes: [],
};

export const quizeSlice = createSlice({
  name: "quize",
  initialState,
  reducers: {


    // reset quize
    resetQuize:(state, action) => {
      state.quizes.length = 0;
      state.subject = "";
    },


    // add quize
    addQuize: (state, action) => {
      const quize = {
        id: nanoid(),
        quizeName: action.payload.quizeName,
        options: [
          action.payload.option1,
          action.payload.option2,
          action.payload.option3,
          action.payload.option4,
        ],
        correctOption: action.payload.correctOption,
      };

      state.subject = action.payload.subject;
      state.quizes.push(quize);
    },

    // remove quize
    removeQuize: (state, action) => {
      state.quizes = state.quizes.filter((item) => item.id !== action.payload);
    },

    // edit quize
    editQuize: (state, action) => {
      state.quizes.filter((item) => {
        if (item.id === action.payload.id) {
          
          item.quizeName = action.payload.quizeName;
          item.correctOption = action.payload.correctOption;
          item.options = [action.payload.option1,action.payload.option2,action.payload.option3,action.payload.option4];
        }
      });
    },
  },
});

export const { resetQuize, addQuize, removeQuize, editQuize } = quizeSlice.actions;
export default quizeSlice.reducer;
