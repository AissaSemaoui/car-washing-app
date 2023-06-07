import mongoose from "mongoose";
const schema = new mongoose.Schema({
  staffname: {
    type: String,
    required: [true, "please enter staff name"],
  },
  phonenumber: {
    type: String,
    required: [true, "please enter phone number"],
  },
  agentSupervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    default: null,
  },
});
mongoose.models = {};
export const Staff = mongoose.model("Staff", schema);
