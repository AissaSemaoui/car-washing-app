import { connectDB } from "../../../utils/features.js";
import { VehicleType } from "../../../models/Vehicle.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
const handler = asyncError(async (req, res) => {
  if (req.method != "GET")
    return errorHandler(res, 400, "only get method is allowed");
  await connectDB();
  const vehicles = await VehicleType.find({});
  res.status(200).json({
    success: true,
    message: "Getting all the Vehicle",
    vehicles,
  });
});

export default handler;
