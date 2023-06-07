import { connectDB } from "../../../utils/features.js";
import { Agent } from "../../../models/Agent.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
import { Staff } from "../../../models/Staff.js";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET method is allowed");

  await connectDB();

  const { select } = req.query;

  const selectFields = select ? select.split(",") : [];

  let agents;
  if (selectFields.length > 0) {
    agents = await Agent.find({}, selectFields.join(" "));
  } else {
    agents = await Agent.find({});
  }

  res.status(200).json({
    success: true,
    message: "Retrieving agents",
    agents,
  });
});

export default handler;
