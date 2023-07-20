const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const security = require("./middleware/security");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//for every request, checks if a token exists in the
//authorization header, if it does attach the decoded user to
//res.locals
app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  console.log("it's all connected");
  res.status(200).json("Success");
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})
module.exports = app;