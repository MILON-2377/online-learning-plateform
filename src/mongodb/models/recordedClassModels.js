import mongoose from "mongoose";

const recordedClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },

  teacherName: {
    type: String,
    required: true,
    trim: true,
  },

  teacherId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },

  scheduledDate: {
    type: Date,
    required: true,
  },

  videoURL: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String,
  },

  uploadDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["available", "processing", "archived"],
    default: "available",
  },
  accessLevel: {
    type: String,
    required: true,
  },

  comments: [
    {
      commentId: {
        type: mongoose.Types.ObjectId,
        auto: true,
      },
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const recordedClass =
  mongoose.models.recordedClasses ||
  mongoose.model("recordedClasses", recordedClassSchema);
export default recordedClass;
