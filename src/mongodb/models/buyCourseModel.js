import mongoose from "mongoose";

const buyCourseSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    courseId:[String],
});

const BuyCourses = mongoose.models.buyCourses || mongoose.model("buyCourses",buyCourseSchema);
export default BuyCourses;