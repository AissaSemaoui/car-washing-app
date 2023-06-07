import mongoose from "mongoose";
const schema = new mongoose.Schema({
  extraservices: {
    type: String,
    required: true,
  },
});
mongoose.models = {};
export const ExtraServices = mongoose.model("ExtraServices", schema);
