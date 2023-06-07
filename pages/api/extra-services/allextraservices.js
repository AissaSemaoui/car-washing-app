import { connectDB } from "../../../utils/features.js";
import { ExtraServices } from "../../../models/ExtraServices.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
const handler = asyncError(async (req, res) => {
  if (req.method != "GET")
    return errorHandler(res, 400, "only get method is allowed");
  await connectDB();
  const extraservices = await ExtraServices.find({});
  res.status(200).json({
    success: true,
    message: "Getting all extraservices",
    extraservices,
  });
});

export default handler;
