import { connectDB } from "../../../utils/features.js";
import { Staff } from "../../../models/Staff.js";
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
  const staff = await Staff.find({}).populate("agentSupervisor");
  res.status(200).json({
    success: true,
    message: "Getting all the staff",
    staff,
  });
});

export default handler;
