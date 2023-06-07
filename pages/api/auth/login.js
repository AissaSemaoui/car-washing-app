import jwt from "jsonwebtoken";
import { asyncError, errorHandler } from "../../../middlewares/error";
import { connectDB } from "../../../utils/features";
import Admin from "../../../models/Admin";

// Mock admin data (replace with your database or admin management logic)

const handler = asyncError(async (req, res) => {
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
      const secretKey =
        "7R5K9x6T9v0Y3t2S4o1N8l2H3w5S6r7A8n9d0o1m2K4e5y6E7x8a9m0p1l2e3";
      // Generate a JWT token
      const token = jwt.sign({ userId: admin._id }, secretKey);

      res.json({ success: true, message: "Signed Successfully", token });
    } catch (err) {
      console.log(err);
    }
  } else {
    errorHandler(res, 405, "Method Not Allowed");
  }
});

export default handler;
