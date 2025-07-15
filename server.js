import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
dotenv.config();
const PORT =  3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/events", eventRoutes);



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });
