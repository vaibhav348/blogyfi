 


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { connectDb } = require("./connection");

require("dotenv").config();

const app = express();
const port = 3100;

connectDb();

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials:true
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use("/api", routes);

app.listen(port, () => console.log(`server is running on port ${port}`));