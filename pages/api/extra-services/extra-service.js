import { asyncError, errorHandler } from "../../../middlewares/error.js";
import { ExtraServices } from "../../../models/ExtraServices.js";
import { connectDB } from "../../../utils/features.js";

const handler = asyncError(async (req, res) => {
  if (req.method != "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const { extraservices } = req.body;
  if (!extraservices) return errorHandler(res, 400, "please add all fields");
  await ExtraServices.create({
    extraservices,
  });
  res.json({
    success: true,
    message: "Extra service Created successfully",
  });
});

export default handler;
