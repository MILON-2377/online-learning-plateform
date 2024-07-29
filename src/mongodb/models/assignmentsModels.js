import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  marks: {
    type: Number,
    default: 0,
  },
  submitted: {
    type: String,
    default: "not sudmitted",
  },
  submittedDate: {
    type: Date,
    default: Date.now,
  },
});

const Assignments =
  mongoose.models.assignments ||
  mongoose.model("assignments", assignmentsSchema);
export default Assignments;
