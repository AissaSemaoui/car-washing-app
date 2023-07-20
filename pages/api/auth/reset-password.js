import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { connectDB } from "../../../utils/features.js";
import Admin from "../../../models/Admin.js";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method !== "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword)
    return errorHandler(res, 400, "Please add all required fields");

  const admin = await Admin.findOne({
    email,
  });

  if (!admin) return errorHandler(res, 404, "Admin doesn't exist");

  if (admin.password !== currentPassword)
    return errorHandler(res, 400, "Wrong Password");

  if (newPassword.length < 8) return errorHandler(res, 400, "Invalid Password");

  admin.password = newPassword;

  await admin.save();

  res.status(200).json({
    success: true,
    message: "Admin Password changed successfully",
  });
});

export default handler;
