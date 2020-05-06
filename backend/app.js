var express = require("express");
var app = express();
const ioServer = require("./socket/index")(app);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var cors = require("cors");
var routes = require("./routes/roomRoutes");
const contactRoutes = require("./routes/contact/index");
const firebaseMiddleware = require("./middleware/auth/index");

//connect to MongoDB
// we're connected!

app.use(cors({ origin: "http://192.168.1.102", credentials: true }));

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    // store: new MongoStore({
    //   mongooseConnection: db,
    // }),
  })
);

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
// app.use(express.static(__dirname + "/templateLogReg"));

// include routes
app.use(routes);
app.use(require("./routes/authRoutes"));
app.use("/secured", firebaseMiddleware);
app.use(contactRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
ioServer.listen(3000, function () {
  console.log("listening on port 3000");
});
