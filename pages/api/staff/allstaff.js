import { connectDB } from "../../../utils/features.js";
import { Staff } from "../../../models/Staff.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
const handler = asyncError(async (req, res) => {
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
