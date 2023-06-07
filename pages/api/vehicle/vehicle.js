import { asyncError, errorHandler } from "../../../middlewares/error.js";
import { VehicleType } from "../../../models/Vehicle.js";
import { connectDB } from "../../../utils/features.js";
const handler = asyncError(async (req, res) => {
  if (req.method != "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const { vehicletype } = req.body;
  if (!vehicletype) return errorHandler(res, 400, "please add all fields");
  await VehicleType.create({
    vehicletype,
  });
  res.json({
    success: true,
    message: "vehicletype Added successfully",
  });
});

export default handler;
