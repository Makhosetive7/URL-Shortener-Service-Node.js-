import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import urlRoute from "./routes/urlRoutes.js"

dotenv.config();

import connectDB from "./config/database.js";

const app = express();


//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/url", urlRoute)


console.log("JWT_SECRET =", process.env.JWT_SECRET);


connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  
  
  );
});

export default app;
