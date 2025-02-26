const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMid = require("./middlewares/error");
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ hello: "Hello Fundraisers" });
});

const user = require("./routes/userRoute");
app.use("/api", user);

const campaign = require("./routes/campaignRoute");
app.use("/api", campaign);

app.use(errorMid);

module.exports = app;
