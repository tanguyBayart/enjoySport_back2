const express = require("express");

const cors = require("cors"); //CORS !!!

const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "enjoysport",
  password: "enjoySportUsrPassword123645DeOuf",
  database: "enjoysport",
  port: 3307,
});

const app = express();
app.use(cors()); //CORS !!!

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));

/**
 * ROUTES
 */
app.get("/cardio", function (req, res) {
  const sql_trainings_cardio = "SELECT * from `enjoysport`.`training_cardio`";

  connection.query(sql_trainings_cardio, function (error, results, fields) {
    if (error) throw error;
    console.log("sql_trainings_cardio request result: ", results);
    res.send(results);
  });
});

app.get("/muscu", function (req, res) {
  // console.log(req.params.id);
  const sql_trainings_muscu =
    "SELECT tme.*, DATE_FORMAT(tms.muscu_session_date, '%d/%m/%Y') AS muscu_session_date FROM `enjoysport`.`training_muscu_exercise` AS tme,`enjoysport`.`training_muscu_session` AS tms WHERE tme.training_muscu_session_id = tms.muscu_session_id";

  connection.query(sql_trainings_muscu, function (error, results, fields) {
    if (error) throw error;
    console.log("sql_trainings_muscu request result: ", results);
    res.send(results);
  });
});

app.get("*", (req, res) => {
  res.send({ error: "no route here" });
});

// connection.end();

module.exports = app;
