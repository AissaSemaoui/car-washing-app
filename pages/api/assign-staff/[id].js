import { Staff } from "../../../models/Staff.js";
import { Agent } from "../../../models/Agent.js";
import { errorHandler, asyncError } from "../../../middlewares/error.js";
import { connectDB } from "../../../utils/features.js";
import NextCors from "nextjs-cors";
const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await connectDB();
  const staffId = req.query.id;
  const agentId = req.body.agentId;
  if (req.method === "POST") {
    const staff = await Staff.findById(staffId);

    staff.agentSupervisor = agentId;

    await staff.save();
    res.status(200).json({
      success: true,
      message: "assinged staff to agent",
      staff,
    });
  }
});

export default handler;
