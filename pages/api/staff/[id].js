import NextCors from "nextjs-cors";
import { errorHandler, asyncError } from "../../../middlewares/error.js";
import { Staff } from "../../../models/Staff.js";
import { connectDB } from "../../../utils/features.js";
const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await connectDB();
  const staffId = req.query.id;
  const staff = await Staff.findById(staffId).populate("agentSupervisor");
  if (!staff) return errorHandler(res, 404, "Staff not Found");
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      message: "Getting single Staff",
      staff,
    });
  } else if (req.method === "PUT") {
    const { staffname, phonenumber } = req.body;
    if (staffname) staff.staffname = staffname;
    if (phonenumber) staff.phonenumber = phonenumber;
    await staff.save();
    res.status(200).json({
      success: true,
      message: "staff updated successfully",
    });
  } else if (req.method === "DELETE") {
    await staff.deleteOne();
    res.status(200).json({
      success: true,
      message: "staff deleted successfully",
    });
  }
});

export default handler;
