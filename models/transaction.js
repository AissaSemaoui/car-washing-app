import mongoose from "mongoose";
const schema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    requried: true,
  },
});
mongoose.models = {};
export const Transaction = mongoose.model("Transaction", schema);
