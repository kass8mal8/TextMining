const express = require("express");
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
// const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const { SECRET_KEY } = process.env;

const app = express();

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use(
	session({
		secret: SECRET_KEY,
		resave: false, // Prevent session resaving when not modified
		saveUninitialized: true, // Save uninitialized session
		cookie: { secure: false }, // Set to true if using HTTPS
	})
);
app.use(limiter);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// app.use(cookieParser());

const authRoute = require("./routes/auth");
const docRoute = require("./routes/document");

app.use("/api/auth", authRoute);
app.use("/api/doc", docRoute);

module.exports = app;
