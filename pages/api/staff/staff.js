import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { Staff } from "../../../models/Staff.js";
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
  const { staffname, phonenumber } = req.body;
  if (!staffname || !phonenumber)
    return errorHandler(res, 400, "please add all fields");
  await Staff.create({
    staffname,
    phonenumber,
  });
  res.json({
    success: true,
    message: "staff Added successfully",
  });
});

export default handler;
