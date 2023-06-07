import NextCors from "nextjs-cors";
import { errorHandler, asyncError } from "../../../middlewares/error.js";
import { Washpackage } from "../../../models/WashPackages.js";
import { connectDB } from "../../../utils/features.js";
const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await connectDB();
  const packageId = req.query.id;
  const washPackage = await Washpackage.findById(packageId);
  if (!washPackage) return errorHandler(res, 404, "Package not Found");
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      message: "Getting single Package",
      washPackage,
    });
  } else if (req.method === "PUT") {
    const { packagename, packageprice, packagefeatures } = req.body;
    if (packagename) washPackage.packagename = packagename;
    if (packageprice) washPackage.packageprice = packageprice;
    if (packagefeatures) washPackage.packagefeatures = packagefeatures;

    const response = await washPackage.save();
    res.status(200).json({
      success: true,
      message: "Package updated successfully",
    });
  } else if (req.method === "DELETE") {
    await washPackage.deleteOne();
    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  }
});

export default handler;
