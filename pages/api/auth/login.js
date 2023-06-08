import jwt from "jsonwebtoken";
import { asyncError, errorHandler } from "../../../middlewares/error";
import { connectDB } from "../../../utils/features";
import Admin from "../../../models/Admin";
import NextCors from "nextjs-cors";

const handler = asyncError(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === "POST") {
    await connectDB();
    const { email, password } = req.body;

    // Find the admin based on the provided email
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return errorHandler(res, 404, "User not found");
      }

      // Check if the password matches
      if (admin.password !== password) {
        return errorHandler(res, 401, "Invalid password");
      }

      // Secret key for signing JWT
      const secretKey = process.env.secretJwtKey;
      // Generate a JWT token
      const token = jwt.sign({ userId: admin._id }, secretKey);

      admin.token = token;
      await admin.save();

      res.json({ success: true, message: "Signed Successfully", token });
    } catch (err) {
      console.log(err);
    }
  } else {
    errorHandler(res, 405, "Method Not Allowed");
  }
});

export default handler;
