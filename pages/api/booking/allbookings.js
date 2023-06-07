import { connectDB } from "../../../utils/features.js";
import { Booking } from "../../../models/Booking.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";

const handler = asyncError(async (req, res) => {
  if (req.method != "GET")
    return errorHandler(res, 400, "only get method is allowed");
  await connectDB();
  const booking = await Booking.find({});
  res.status(200).json({
    success: true,
    message: "Getting all the bookings",
    booking,
  });
});

export default handler;
