import { asyncError, errorHandler } from "../../../middlewares/error.js";
import NextCors from "nextjs-cors";
import { Washpackage } from "../../../models/WashPackages.js";
import { connectDB } from "../../../utils/features.js";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method != "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const { packagename, packageprice, packagefeatures, packageduration } =
    req.body;
  if (
    !packagename ||
    !packageprice ||
    !packagefeatures ||
    !Number(packageduration)
  )
    return errorHandler(res, 400, "please add all fields");
  await Washpackage.create({
    packagename,
    packageprice,
    packageduration: Number(packageduration),
    packagefeatures,
  });

  res.json({
    success: true,
    message: "Wash package Added successfully",
  });
});

export default handler;
