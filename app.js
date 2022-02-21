const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const eventRoute = require("./routes/event");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

//set up express
app.listen(process.env.PORT || 4000);

console.log(process.env.PORT);
console.log("Listening Now");

//connect to database
mongoose.connect(
  "mongodb+srv://wk226:walikhan1@cluster0.6bfyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useCreateIndex: true, useNewUrlParser: true },
  () => console.log("Connected to Database")
);
mongoose.Promise = global.Promise;

//setup morgan
app.use(morgan("dev"));

//setup bodyparser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// disable cross orgigin resource sharing
app.use((res, req, next) => {
  res.header("Access-Control-Allow-Arigin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//using routes
app.use("/", userRoute);
app.use("/", eventRoute);
app.use("/", postRoute);
app.use("/", commentRoute);

//middleware for error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});
