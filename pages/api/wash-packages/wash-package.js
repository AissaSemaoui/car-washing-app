import { asyncError, errorHandler } from "../../../middlewares/error.js";
import { Washpackage } from "../../../models/WashPackages.js";
import { connectDB } from "../../../utils/features.js";

const handler = asyncError(async (req, res) => {
  if (req.method != "POST")
    return errorHandler(res, 400, "only post method is allowed");
  await connectDB();
  const { packagename, packageprice, packagefeatures } = req.body;
  if (!packagename || !packageprice || !packagefeatures)
    return errorHandler(res, 400, "please add all fields");
  await Washpackage.create({
    packagename,
    packageprice,
    packagefeatures,
  });

  res.json({
    success: true,
    message: "Wash package Added successfully",
  });
});

export default handler;
