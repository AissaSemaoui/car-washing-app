import mongoose from "mongoose";
const schema = new mongoose.Schema({
  extraservices: {
    type: String,
    required: true,
  },
  extraservicesprice: {
    type: Number,
    required: true,
  },
});
mongoose.models = {};
export const ExtraServices = mongoose.model("ExtraServices", schema);
