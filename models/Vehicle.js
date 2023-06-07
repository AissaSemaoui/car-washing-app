import mongoose from "mongoose";
const schema = new mongoose.Schema({
  vehicletype: {
    type: String,
    required: [true, "please enter VehicleType"],
  },
});
mongoose.models = {};
export const VehicleType = mongoose.model("VehicleType", schema);
