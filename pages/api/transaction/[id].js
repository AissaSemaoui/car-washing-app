import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { Booking } from "../../../models/Booking.js";
import { connectDB } from "../../../utils/features.js";
import request from "request";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await connectDB();
  const bookingId = req.query.id;
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only the POST method is allowed");
  if (!bookingId) return errorHandler(res, 400, "Booking ID is required");

  try {
    // Retrieve the booking details based on the booking ID
    const booking = await Booking.findById(bookingId);

    if (!booking) return errorHandler(res, 400, "Invalid booking ID");

    const packagePrice = booking.bookingthings[0].packageprice;

    if (!packagePrice)
      return errorHandler(
        res,
        400,
        "Booking does not contain package information"
      );

    const bookingCreationTime = booking.createdAt;
    const expirationTime = new Date(bookingCreationTime);
    expirationTime.setHours(expirationTime.getHours() + 24);

    const options = {
      method: "POST",
      url: "https://demo.bookeey.com/BKY/CSR/Invoice",
      headers: {
        "x-api-key":
          "9d6faae816329d7ee295305768802829ee5e1a4f28fd41e5a3d7b885c6864f7105ee227b67eefca1c4c86c69834acbf567b2bc1cb3be52058b976c3cdbd30473",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Do_TxnDtl: [
          {
            SubMerchUID: "mer23000146",
            Txn_AMT: booking.bookingthings[0].packageprice,
          },
        ],
        Do_TxnHdr: {
          CreatedBy: "mer23000146",
          dispatch_date: booking.bookingDateTime,
          DOExpirtyTyp: "1",
          Txn_Date: booking.createdAt,
          Merch_Txn_UID: "99364796",
          DOExpirty: expirationTime.toISOString(),
        },
        Do_Appinfo: {
          AppLicens: "s",
          AppTyp: "WAPP",
          APPID: "CRM",
          IPAddrs: "",
          Country: "",
          AppVer: "1.0",
          MdlID: "CSR",
          ApiVer: "1.0",
        },
        Do_PyrDtl: {
          ISDNCD: "965",
          Pyr_Remark: "",
          Pyr_MPhone: booking.phonenumber,
          Pyr_GovDocTyp: "CID",
          Pyr_Name: booking.firstname + " " + booking.lastname,
          PrfLang: "EN",
        },
        Do_MerchDtl: {
          BrnchUID: "",
          BKY_PRDENUM: "BInv",
          MerchUID: "mer23000146",
          POSUID: "",
        },
        Do_UsrAuth: {
          UsrSessnUID:
            "73bd664a94324428da6bd9085bb6a5bc85d4a21f460a599d9de19edb18f71dce634220ed5ae4ca54d1f31812387492b32049b21e0642fea6653f6f4e919b3709",
          AuthTyp: "2",
        },
        DBRqst: "Save_N",
        Do_Dvcinfo: {
          DevcTyp: "",
          DevOS: "",
          MPhnOprtr: "",
          DevID: "",
          MPhnSIMID: "",
        },
        Do_MoreDtl: {},
      }),
    };

    request(options, function (error, response, body) {
      if (error) {
        console.error("Payment API error:", error);
        return errorHandler(res, 500, "Payment API error");
      }
      console.log(response, body, error);
      res.status(200).json({
        success: true,
        booking,
        response: body,
      });
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    errorHandler(res, 500, "Error processing payment");
  }
});

export default handler;
