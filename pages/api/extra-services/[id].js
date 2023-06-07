import NextCors from "nextjs-cors";
import { errorHandler, asyncError } from "../../../middlewares/error.js";
import { ExtraServices } from "../../../models/ExtraServices.js";
import { connectDB } from "../../../utils/features.js";
const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await connectDB();
  const extraserviceId = req.query.id;
  // console.log(agentId)
  const extraservicess = await ExtraServices.findById(extraserviceId);
  if (!extraservicess) return errorHandler(res, 404, "extraservices not Found");
  if (req.method === "PUT") {
    const { extraservices } = req.body;
    if (extraservices) extraservicess.extraservices = extraservices;
    await extraservicess.save();
    res.status(200).json({
      success: true,
      message: "Extraservices updated successfully",
    });
  } else if (req.method === "DELETE") {
    const response = await ExtraServices.deleteOne({ _id: extraserviceId });

    res.status(200).json({
      success: true,
      message: "extrasrvicess deleted successfully",
    });
  }
});

export default handler;
