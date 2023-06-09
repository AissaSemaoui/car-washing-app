import { connectDB } from "../../../utils/features.js";
import { Agent } from "../../../models/Agent.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { Staff } from "../../../models/Staff.js";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET method is allowed");

  await connectDB();

  const { select } = req.query;

  const selectFields = select ? select.split(",") : [];

  let agents;
  if (selectFields.length > 0) {
    agents = await Agent.find({}, selectFields.join(" ")).sort({
      createdAt: "desc",
    });
  } else {
    agents = await Agent.find({}).sort({
      createdAt: "desc",
    });
  }

  res.status(200).json({
    success: true,
    message: "Retrieving agents",
    agents,
  });
});

export default handler;
