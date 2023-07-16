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

  if (req.method === "DELETE") {
    await Booking.deleteOne({ _id: bookingId });

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  }

  if (req.method === "PUT") {
    try {
      const agentId = req.body?.agentId;
      const agent = await Agent.findById(agentId);

      const startDay = moment(booking.bookingDateTime).startOf("day");
      const endDay = moment(booking.bookingDateTime).endOf("day");

      const desiredHour = moment(booking.bookingDateTime);
      const desiredDuration = booking?.bookingthings[0]?.packageduration || 1;

      const agentBookings = await Booking.find({
        bookingDateTime: {
          $gte: startDay.toDate(),
          $lte: endDay.toDate(),
        },
        "AgentInfo.agentId": agent._id,
      });

      console.log(agentBookings.length);

      const isAvailable = agentBookings.every((existingBooking) => {
        const existingBookingDateTime = moment(existingBooking.bookingDateTime);
        const existingBookingDurationHours =
          existingBooking?.bookingthings[0]?.packageduration || 1;

        const existingBookingEndDateTime = moment(existingBookingDateTime).add(
          existingBookingDurationHours,
          "hours"
        );

        // Check if the desired booking overlaps with an existing booking
        return !(
          (existingBookingDateTime.isSameOrBefore(desiredHour) &&
            existingBookingEndDateTime.isAfter(desiredHour)) ||
          (desiredHour.isSameOrBefore(existingBookingDateTime) &&
            desiredHour.isAfter(
              existingBookingDateTime.subtract(desiredDuration, "hours")
            ))
        );
      });

      if (!isAvailable) {
        return errorHandler(
          res,
          409,
          "Agent is not available at the desired time. Choose a different agent."
        );
      }

      const agentInformation = {
        agentId: agent._id,
        agentname: agent.agentname,
        agentphonenumber: agent.phonenumber,
      };
      booking.AgentInfo = agentInformation;

      const agentStaff = await Staff.find({
        agentSupervisor: agentInformation.agentId,
      });

      const address = `${booking.area}, Block ${booking.block}, Avenue ${booking.avenue}, Street ${booking.street}, House ${booking.house}`;

      // Send WhatsApp message to Agent
      sendWhatsAppMessage(
        agentInformation.agentphonenumber,
        `🚚 New booking alert! 📅 ${moment(booking.bookingDateTime).format(
          "L, HH:mm"
        )}: 
${booking.bookingthings[0]?.vehicletype}, ${
          booking.bookingthings[0]?.packagename
        } package, 
At ${address}`
      );

      // Send WhatsApp message to Staff of the Agent
      agentStaff.forEach((staff) => {
        sendWhatsAppMessage(
          staff.phonenumber,
          `📣 New booking alert! 📅 ${moment(booking.bookingDateTime).format(
            "L, HH:mm"
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
