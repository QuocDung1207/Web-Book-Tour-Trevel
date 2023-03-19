const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");

const app = express();

//1)MIDDLEWARE

if (process.env.NODE_ENV === "development") {
  app.use(morgan(`dev`));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log("Hello from the middleware ");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
