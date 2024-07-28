import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  profession: {
    type: String,
    required: [true, "profession is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Users = mongoose.models.users || mongoose.model("users", userSchema);
export default Users;
