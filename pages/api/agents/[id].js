import { errorHandler, asyncError } from "../../../middlewares/error.js";
import { Agent } from "../../../models/Agent.js";
import { Staff } from "../../../models/Staff.js";
import { connectDB } from "../../../utils/features.js";

const handler = asyncError(async (req, res) => {
  await connectDB();
  const agentId = req.query.id;
  let agent = await Agent.findById(agentId);

  if (!agent) return errorHandler(res, 404, "Agent not Found");
  if (req.method === "GET") {
    const assignedstaff = await Staff.find(
      { agentSupervisor: agentId },
      "staffname phonenumber"
    );
    agent = { ...agent.toObject(), assignedstaff };
    res.status(200).json({
      success: true,
      message: "Getting single Agent",
      agent,
    });
  } else if (req.method === "PUT") {
    const { agentname, phonenumber } = req.body;
    if (agentname) agent.agentname = agentname;
    if (phonenumber) agent.phonenumber = phonenumber;
    await agent.save();
    res.status(200).json({
      success: true,
      message: "Agent updated successfully",
    });
  } else if (req.method === "DELETE") {
    await agent.deleteOne();
    res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });
  }
});

export default handler;
