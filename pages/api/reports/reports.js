import NextCors from "nextjs-cors";
import { asyncError, errorHandler } from "../../../middlewares/error";
import { Agent } from "../../../models/Agent";
import { Booking } from "../../../models/Booking";
import { Staff } from "../../../models/Staff";
import { connectDB } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === "GET") {
    try {
      await connectDB(); // Connect to the database

      // Calculate the date ranges for the last monthly, last 3 months, and last year
      const currentDate = new Date();
      const lastMonthlyDate = new Date();
      lastMonthlyDate.setMonth(lastMonthlyDate.getMonth() - 1);

      const last3MonthsDate = new Date();
      last3MonthsDate.setMonth(last3MonthsDate.getMonth() - 3);

      const lastYearDate = new Date();
      lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

      // Perform analytics and generate reports
      const totalBookings = await Booking.countDocuments();
      const totalEarnings = await Booking.aggregate([
        { $unwind: "$bookingthings" },
        {
          $group: {
            _id: null,
            earnings: { $sum: "$bookingthings.packageprice" },
          },
        },
      ]);

      const monthlyBookings = await Booking.countDocuments({
        createdAt: { $gte: lastMonthlyDate, $lte: currentDate },
      });

      const monthlyEarnings = await Booking.aggregate([
        { $unwind: "$bookingthings" },
        {
          $match: {
            createdAt: { $gte: lastMonthlyDate, $lte: currentDate },
          },
        },
        {
          $group: {
            _id: null,
            earnings: { $sum: "$bookingthings.packageprice" },
          },
        },
      ]);

      const threeMonthsBookings = await Booking.countDocuments({
        createdAt: { $gte: last3MonthsDate, $lte: currentDate },
      });

      const threeMonthsEarnings = await Booking.aggregate([
        { $unwind: "$bookingthings" },
        {
          $match: {
            createdAt: { $gte: last3MonthsDate, $lte: currentDate },
          },
        },
        {
          $group: {
            _id: null,
            earnings: { $sum: "$bookingthings.packageprice" },
          },
        },
      ]);

      const yearlyBookings = await Booking.countDocuments({
        createdAt: { $gte: lastYearDate, $lte: currentDate },
      });

      const yearlyEarnings = await Booking.aggregate([
        { $unwind: "$bookingthings" },
        {
          $match: {
            createdAt: { $gte: lastYearDate, $lte: currentDate },
          },
        },
        {
          $group: {
            _id: null,
            earnings: { $sum: "$bookingthings.packageprice" },
          },
        },
      ]);

      const totalAgents = await Agent.countDocuments();
      const totalStaff = await Staff.countDocuments();

      res.status(200).json({
        success: true,
        message: "Reports and analytics retrieved successfully",
        data: {
          monthly: {
            monthlyBookings,
            monthlyEarnings: monthlyEarnings[0]
              ? monthlyEarnings[0].earnings
              : 0,
          },
          threeMonths: {
            threeMonthsBookings,
            threeMonthsEarnings: threeMonthsEarnings[0]
              ? threeMonthsEarnings[0].earnings
              : 0,
          },
          yearly: {
            yearlyBookings,
            yearlyEarnings: yearlyEarnings[0] ? yearlyEarnings[0].earnings : 0,
          },
          totalBookings,
          totalEarnings: totalEarnings[0] ? totalEarnings[0].earnings : 0,
          totalAgents,
          totalStaff,
        },
      });
    } catch (error) {
      console.log(error);
      errorHandler(res, 500, "Internal server error");
    }
  } else {
    console.log(error);
    errorHandler(res, 405, "Method Not Allowed");
  }
});

export default handler;
