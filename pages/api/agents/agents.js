import { asyncError, errorHandler } from "../../../middlewares/error.js";
import { Agent } from "../../../models/Agent.js";
import { connectDB } from "../../../utils/features.js";
const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const { agentname, phonenumber } = req.body;
  if (!agentname || !phonenumber)
    return errorHandler(res, 400, "please add all fields");
  await Agent.create({
    agentname,
    phonenumber,
  });

  res.status(200).json({
    success: true,
    message: "Agent Created successfully",
  });
});

export default handler;
