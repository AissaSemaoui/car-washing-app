import { connectDB } from "../../../utils/features.js";
import { Booking } from "../../../models/Booking.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method != "GET")
    return errorHandler(res, 400, "only get method is allowed");
  await connectDB();
  const booking = await Booking.find({}).sort({
    createdAt: "desc",
  });
  res.status(200).json({
    success: true,
    message: "Getting all the bookings",
    booking,
  });
});

export default handler;
