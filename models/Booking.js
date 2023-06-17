import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  block: {
    type: String,
  },
  avenue: {
    type: String,
  },
  street: {
    type: String,
  },
  house: {
    type: String,
  },
  bookingthings: [
    {
      vehicletype: {
        type: String,
        required: true,
      },
      packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Washpackage",
        required: true,
      },
      packagename: {
        type: String,
        required: true,
      },
      packageprice: {
        type: Number,
        required: true,
      },
      extraservicesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraServices",
      },
      extraservicesname: {
        type: String,
      },
    },
  ],
  bookingDateTime: {
    type: Date,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  AgentInfo: {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    agentname: {
      type: String,
      required: true,
    },
    agentphonenumber: {
      type: String,
      required: true,
    },
  },
});

mongoose.models = {};

export const Booking = mongoose.model("Booking", schema);
