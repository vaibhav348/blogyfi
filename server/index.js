const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { connectDb } = require("./connection");

require("dotenv").config();

const app = express(); 

connectDb()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection failed:", err));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use("/api", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on PORT ${port}`));
