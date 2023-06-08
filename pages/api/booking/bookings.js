import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { Booking } from "../../../models/Booking.js";
import { ExtraServices } from "../../../models/ExtraServices.js";
import { Washpackage } from "../../../models/WashPackages.js";
import { connectDB } from "../../../utils/features.js";
import { sendWhatsAppMessage } from "../../../sendWhatsAppMessage.js";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method !== "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const vehicletype = req.body.vehicletype;
  const packageId = req.body.packageId;
  const extraservicesId = req.body.extraservicesId;
  const washpackage = await Washpackage.findById(packageId);
  const extraservices = await ExtraServices.findById(extraservicesId);
  const bookingInfo = {
    vehicletype: vehicletype,
    packageId: washpackage._id,
    packagename: washpackage.packagename,
    packageprice: Number(washpackage.packageprice[vehicletype]) || 0,
    extraservicesId: extraservices._id,
    extraservicesname: extraservices.extraservices,
  };
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
    bookingDateTime: bookingDateTimeInIndia,
    createdAt: new Date(),
  });

  newBooking.bookingthings.push(bookingInfo);
  await newBooking.save();

  const to = phonenumber;
  const message = `Your booking details are ${newBooking}`;
  sendWhatsAppMessage(to, message);
  // Calculate the reminder time
  const reminderTime = bookingDateTimeInIndia.getTime() - 30 * 60 * 1000;
  // Schedule a reminder notification
  if (reminderTime > Date.now()) {
    setTimeout(() => {
      const reminderMessage = `Reminder: Your booking is scheduled in 30 minutes.${newBooking}`;
      sendWhatsAppMessage(to, reminderMessage);
    }, reminderTime - Date.now());
  }
  res.json({
    success: true,
    message: "Booking Created successfully",
    newBooking,
  });
});

export default handler;
