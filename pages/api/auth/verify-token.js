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
    const { token } = req.body;

    try {
      // Secret key for signing JWT
      const secretKey = process.env.secretJwtKey;

      const decoded = jwt.verify(token, secretKey);
      const { userId } = decoded;

      const admin = await Admin.findOne({ _id: userId });

      if (!admin) {
        return errorHandler(res, 404, "User not found.");
      }
      // Check if the token matches
      if (admin.token !== token) {
        return errorHandler(res, 401, "Token is invalid or expired.");
      }

      // Generate new JWT token
      // const newToken = jwt.sign({ userId: admin._id }, secretKey);
      // admin.token = newToken;
      // await admin.save();

      res.json({ success: true, message: "Token is valid.", token: token });
    } catch (err) {
      return errorHandler(res, 401, "Token is invalid or expired.");
    }
  } else {
    errorHandler(res, 405, "Method Not Allowed.");
  }
});

export default handler;
