import { Agent } from "../../../models/Agent.js";
import { Booking } from "../../../models/Booking.js";
import { errorHandler, asyncError } from "../../../middlewares/error.js";
import { connectDB } from "../../../utils/features.js";
import NextCors from "nextjs-cors";
import { Staff } from "../../../models/Staff.js";
import moment from "moment";
import { sendWhatsAppMessage } from "../../../sendWhatsAppMessage.js";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await connectDB();
  const bookingId = req.query.id;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return errorHandler(res, 404, "Booking not found");
  }

  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      message: "Getting single booking data",
      booking,
    });
  }

  if (req.method === "PUT") {
    try {
      const agentId = req.body?.agentId;
      const agent = await Agent.findById(agentId);

      const agentInformation = {
        agentId: agent._id,
        agentname: agent.agentname,
        agentphonenumber: agent.phonenumber,
      };
      booking.AgentInfo = agentInformation;

      const agentStaff = await Staff.find({
        agentSupervisor: agentInformation.agentId,
      });

      console.log("those are the agent staff : ", agentStaff);

      // Send WhatsApp message to Agent
      sendWhatsAppMessage(
        agentInformation.agentphonenumber,
        `You have a new booking for ${
          booking.bookingthings[0]?.vehicletype
        } Auto and ${booking.bookingthings[0]?.packagename} package on ${moment(
          booking.bookingDateTime
        ).format("L")}`
      );

      // Send WhatsApp message to Staff of the Agent
      agentStaff.forEach((staff) => {
        sendWhatsAppMessage(
          staff.phonenumber,
          `You have a new booking on ${moment(booking.bookingDateTime).format(
            "L"
          )}`
        );
      });

      await booking.save();
    } catch (err) {
      console.log(err);
      return errorHandler(res, 400, "Failed assigning agent to booking");
    }
    res.status(200).json({
      success: true,
      message: "assinged agent to booking",
    });
  }
});

export default handler;
