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
  const selectedBooking = await Booking.findOne({ _id: bookingId });

  if (!selectedBooking) return errorHandler(res, 400, "Booking not Found");

  if (req.method === "GET") {
    const desiredTime = new Date(selectedBooking.bookingDateTime);

    const overlappingBookings = await Booking.find({
      bookingDateTime: desiredTime,
    });

    const bookedAgentsId = overlappingBookings.map(
      (booking) => booking?.AgentInfo?.agentId || null
    );

    const availableAgents = Agent.find(
      {
        _id: { $nin: bookedAgentsId },
      },
      "agentname _id"
    );

    console.log(availableAgents);

    res.status(200).json({
      success: true,
      message: "Getting Available Agents",
      availableAgents,
    });
  }
});

export default handler;
