import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    required: true,
  },
  courseFee: {
    type: Number,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
});

courseSchema.index({
  title: "text",
  description: "text",
  courseCategory: "text",
  courseLevel: "text",
  courseFee: "text", 
});

const Course =
  mongoose.models.courses || mongoose.model("courses", courseSchema);
export default Course;
