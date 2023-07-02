import mongoose from "mongoose";
export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "carwash-app",
    })
    .then(({ connection }) =>
      console.log(`Database Connected on ${connection.host}`)
    )
    .catch((error) => {
      throw new Error(error);
    });
};
