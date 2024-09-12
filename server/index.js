const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { connectDb } = require("./connection");

require("dotenv").config();

const app = express();

// Connect to the database
connectDb()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection failed:", err));

// Enable CORS with your frontend URL from the environment variable
app.use(
  cors({
    origin: process.env.FRONTEND_URL,  // Use URL from .env
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", routes);

// Set port from environment variable or default to 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on PORT ${port}`));
