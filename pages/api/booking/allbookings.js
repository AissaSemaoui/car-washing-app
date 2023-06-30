import { connectDB } from "../../../utils/features.js";
import { Booking } from "../../../models/Booking.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import moment from "moment";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await connectDB();

  if (req.method === "GET") {
    const booking = await Booking.find({}).sort({
      createdAt: "desc",
    });

    return res.status(200).json({
      success: true,
      message: "Getting all the bookings",
      booking,
    });
  }

  if (req.method === "POST") {
    const selectedDay = moment(req.body?.selectedDay).startOf("day");
    const nextDay = moment(selectedDay).add(1, "day");

    const bookings = await Booking.find({
      bookingDateTime: {
        $gte: selectedDay.toDate(),
        $lt: nextDay.toDate(),
      },
    });

    console.log(bookings[0]?.AgentInfo);

    console.log(selectedDay.toDate(), nextDay.toDate());

    const bookingsPerAgent = {};

    bookings.forEach((booking) => {
      if (!booking.AgentInfo?.agentId) return;

      if (!Array.isArray(bookingsPerAgent[booking.AgentInfo.agentId])) {
        bookingsPerAgent[booking.AgentInfo.agentId] = [];
      }
      console.log(booking.AgentInfo?.agentname);
      bookingsPerAgent[booking.AgentInfo?.agentId].push(booking);
    });

    console.log("this is bookings per agent : ", bookingsPerAgent);

    return res.status(200).json({
      success: true,
      message: "Getting Bookings of a specific day",
      bookingsPerAgent,
    });
  }

  return errorHandler(res, 400, "only get method is allowed");
});

export default handler;
