const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// Connect mongoDB
require("./common/mongoDB");

// Using session

app.use(
  session({
    secret: "vietpro",
    resave: true,
    saveUninitialized: true
  })
);

app.use(require("./apps/middlewares/cart"));
app.use(require("./apps/middlewares/share"));

// Static file
app.use("/static", express.static(__dirname + "/public"));

// Body parser: Parser body data sang object và map lại req
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config template egine
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// Router
app.use("/", require("./routers/web"));

module.exports = app;
