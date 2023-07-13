import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { ExtraServices } from "../../../models/ExtraServices.js";
import { connectDB } from "../../../utils/features.js";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method != "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const { extraservices, extraservicesprice } = req.body;
  if (!extraservices) return errorHandler(res, 400, "please add all fields");
  await ExtraServices.create({
    extraservices,
    extraservicesprice,
  });
  res.json({
    success: true,
    message: "Extra service Created successfully",
  });
});

export default handler;
