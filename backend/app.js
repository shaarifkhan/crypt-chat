var express = require("express");
var app = express();
const ioServer = require("./socket")(app);
var bodyParser = require("body-parser");
var cors = require("cors");
const { expressRoutes } = require("./routes");

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://192.168.1.104", credentials: true }));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
expressRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("inside erro handler");
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  console.log("inside erro handler 2");

  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
ioServer.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
