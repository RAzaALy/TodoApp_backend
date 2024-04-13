require("dotenv").config();
const express = require("express");
const cors = require("cors");
import bodyParser from 'body-parser'
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/db.confg.js");
const userRouter = require("./route/userRoute.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  })
);
app.use(cors());
// app.use(cors({origin: ['http://localhost:5173','https://todo-app-frontend-pearl.vercel.app'], credentials: true}))

app.use("/", userRouter);

// db init
connectToDb();

module.exports = app;
