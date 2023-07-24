import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { Booking } from "../../../models/Booking.js";
import { ExtraServices } from "../../../models/ExtraServices.js";
import { Washpackage } from "../../../models/WashPackages.js";
import { connectDB } from "../../../utils/features.js";
import { sendWhatsAppMessage } from "../../../sendWhatsAppMessage.js";
import moment from "moment";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    if (req.method !== "POST")
      return errorHandler(res, 400, "only post method is allowed");
    await connectDB();
    const vehicletype = req.body.vehicletype;
    const packageId = req.body.packageId;
    const extraservicesId = req.body.extraservicesId;
    const washpackage = await Washpackage.findById(packageId);

    const extraservices = extraservicesId
      ? await ExtraServices.findById(extraservicesId)
      : "";
    const bookingInfo = {
      vehicletype: vehicletype,
      packageId: washpackage._id,
      packagename: washpackage.packagename,
      packageprice:
        Number(washpackage.packageprice[vehicletype.toLowerCase()]) || 0,
      packageduration: Number(washpackage.packageduration),
    };
    console.log(bookingInfo);
    if (extraservices) {
      bookingInfo.extraservicesId = extraservices?._id;
      bookingInfo.extraservicesname = extraservices?.extraservices;
      bookingInfo.extraservicesprice = extraservices?.extraservicesprice;
    }
    const {
      firstname,
      lastname,
      phonenumber,
      area,
      block,
      avenue,
      street,
      house,
      bookingDateTime,
    } = req.body;
    const bookingDate = new Date(bookingDateTime);
    const bookingDateTimeInIndia = new Date(
      bookingDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const newBooking = new Booking({
      firstname,
      lastname,
      phonenumber,
      area,
      block,
      avenue,
      street,
      house,
      bookingDateTime: bookingDate,
      createdAt: new Date(),
    });

    newBooking.bookingthings.push(bookingInfo);
    await newBooking.save();

    const to = phonenumber;
    const message = `عميلنا العزيز،
شركة q8handclean تذكركم بموعدكم بتاريخ ${moment
      .utc(newBooking.bookingDateTime)
      .format("L HH:mm")}`;

    console.log(message);
    await sendWhatsAppMessage(to, message);
    // Calculate the reminder time
    const reminderTime = bookingDate.getTime() - 30 * 60 * 1000;
    // Schedule a reminder notification
    if (reminderTime > Date.now()) {
      setTimeout(() => {
        const reminderMessage = `Reminder: Your booking is scheduled in 30 minutes.${newBooking}`;
        sendWhatsAppMessage(to, reminderMessage);
      }, reminderTime - Date.now());
    }
    res.status(200).json({
      success: true,
      message: "Booking Created successfully",
      newBooking,
    });
  } catch (error) {
    return errorHandler(res, 400, "Request Failed!");
  }
});

export default handler;
