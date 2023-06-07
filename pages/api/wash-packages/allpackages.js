import { connectDB } from "../../../utils/features.js";
import { Washpackage } from "../../../models/WashPackages.js";
import { asyncError, errorHandler } from "../../../middlewares/error.js";
const handler  = asyncError(async(req,res)=>{
    if(req.method != "GET") 
        return errorHandler(res,400,"only get method is allowed");
    await connectDB();
    const packages = await Washpackage.find({});
    res.status(200).json({
        success:true,
        message:"Getting all the packages",
        packages
    })
});

export default handler;