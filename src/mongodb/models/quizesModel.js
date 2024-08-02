import mongoose, { mongo } from "mongoose";

const quizeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  quizeName: {
    type: String,
    required: true,
  },
  options: {
    type:[String],
    required: true,
  },
  correctOption: {
    type: String,
    required: true,
  },
});


const totalQuizesSchema = new mongoose.Schema({
    totalQuizes: {
        type: [quizeSchema],
        required: true,
    },
    id: {
        type: String,
        required: true,
    }
});

const Quizes = mongoose.models.quizes || mongoose.model("quizes", totalQuizesSchema);
export default Quizes;