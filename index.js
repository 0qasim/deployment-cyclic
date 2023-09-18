const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const cookieParser = require("cookie-parser");
const EmployeeModel = require("./models/Employee.js");

const uri = `mongodb://qaziqasim:qasim92@ac-q6ddqhi-shard-00-00.sp0ggxq.mongodb.net:27017,ac-q6ddqhi-shard-00-01.sp0ggxq.mongodb.net:27017,ac-q6ddqhi-shard-00-02.sp0ggxq.mongodb.net:27017/?ssl=true&replicaSet=atlas-9hh664-shard-0&authSource=admin&retryWrites=true&w=majority`;

require("dotenv").config();

const app = express();

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );
  next();
});

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "X-Requested-With",
      "Accept",
    ],
  })
);

app.use(express.static(path.join(__dirname, "./react-navigation/dist")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./react-navigation/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.post("/Signin", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const userData = { email: user.email, name: user.name };

            const serializedData = JSON.stringify(userData);

            res.cookie("userData", serializedData, { maxAge: 3600000 });

            return res.json("**Success");
          } else {
            return res.json("Password is Incorrect");
          }
        });
      } else {
        res.json("*Please first Signup no record found");
      }
    })
    .catch((err) => res.json(err));
});

app.post("/Signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3001, () => {
  console.log("Server is running ");
});
