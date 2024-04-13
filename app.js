require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/db.confg.js");
const userRouter = require("./route/userRoute.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  })
);
// app.use(cors());
app.use(
  cors({
    origin: ["https://todo-app-frontend-pearl.vercel.app","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/", userRouter);

// db init
connectToDb();

module.exports = app;
