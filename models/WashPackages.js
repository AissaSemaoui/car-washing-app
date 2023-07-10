import mongoose from "mongoose";

const schema = new mongoose.Schema({
  packagename: {
    type: String,
    required: [true, "please enter package name"],
  },
  packageprice: {
    suv: Number,
    sedan: Number,
    pickup: Number,
    bike: Number,
  },
  packageduration: {
    type: Number,
  },
  packagefeatures: {
    type: [String],
    required: true,
  },
});

mongoose.models = {};

export const Washpackage = mongoose.model("Washpackage", schema);
