import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    default: null,
  },
});

mongoose.models = {};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
