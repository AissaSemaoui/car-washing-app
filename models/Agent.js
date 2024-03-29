import mongoose from "mongoose";

const schema = new mongoose.Schema({
  agentname: {
    type: String,
    required: [true, "please enter agent name"],
  },
  phonenumber: {
    type: String,
    required: [true, "please enter phone number"],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  // assignedstaff: [
  //   {
  //     staffId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Staff",
  //       required: true,
  //     },
  //     staffname: {
  //       type: String,
  //       required: true,
  //     },
  //     phonenumber: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
});

mongoose.models = {};

export const Agent = mongoose.model("Agent", schema);
