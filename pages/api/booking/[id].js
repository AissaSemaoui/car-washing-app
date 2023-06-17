import { Agent } from "../../../models/Agent.js";
import { Booking } from "../../../models/Booking.js";
import { errorHandler, asyncError } from "../../../middlewares/error.js";
import { connectDB } from "../../../utils/features.js";
import NextCors from "nextjs-cors";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await connectDB();
  const bookingId = req.query.id;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return errorHandler(res, 404, "Booking not found");
  }

  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      message: "Getting single booking data",
      booking,
    });
  }

  if (req.method === "PUT") {
    const agentId = req.body.agentId;
    const agent = await Agent.findById(agentId);

    const agentInformation = {
      agentId: agent._id,
      agentname: agent.agentname,
      agentphonenumber: agent.phonenumber,
    };
    booking.AgentInfo = agentInformation;
    try {
      await booking.save();
    } catch (err) {
      console.log(err);
      return errorHandler(res, 400, "Failed assigning agent to booking");
    }
    res.status(200).json({
      success: true,
      message: "assinged agent to customer",
    });
  }
});

export default handler;
