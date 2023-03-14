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

app.get("/test", function (req, res) {
  const sql_trainings_cardio =
    "SELECT cardio_date as Date, cardio_exercice as Exercice, cardio_kcal as Kcal, cardio_temps as Temps from `enjoysport`.`training_cardio` where cardio_kcal > 0 order by cardio_date DESC";

  // sql_trainings_cardio =
  //   "SELECT cardio_date, cardio_exercice, cardio_kcal, cardio_temps from `enjoysport`.`training_cardio` order by cardio_date DESC";

  connection.query(sql_trainings_cardio, function (error, results, fields) {
    if (error) throw error;
    console.log(
      "sql_trainings_cardio request result (TEST TENTENDS!!): ",
      results
    );
    res.send(results);
  });
});

app.get("/cardio/:id/koko/:label", function (req, res) {
  console.log(req.params.id, req.params.label);
  // const sql_trainings_cardio =
  //   "SELECT cardio_date as Date, cardio_exercice as Exercice, cardio_kcal as Kcal, cardio_temps as Temps from `enjoysport`.`training_cardio` order by cardio_date ASC";

  // connection.query(sql_trainings_cardio, function (error, results, fields) {
  //   if (error) throw error;
  //   console.log("sql_trainings_cardio request result: ", results);
  //   res.send(results);
  // });
  res.send({ id: req.params.id, label: req.params.label });
});

app.get("/cardio", function (req, res) {
  const sql_trainings_cardio =
    "SELECT cardio_date as Date, cardio_exercice as Exercice, cardio_kcal as Kcal, cardio_temps as Temps from `enjoysport`.`training_cardio` order by cardio_date ASC";

  connection.query(sql_trainings_cardio, function (error, results, fields) {
    if (error) throw error;
    console.log("sql_trainings_cardio request result: ", results);
    res.send(results);
  });
});
app.post("/addcardio", function (req, res) {
  // INSERT INTO `enjoysport`.`training_cardio` ( `cardio_date`, `cardio_exercice`, `cardio_temps`, `cardio_kcal`) VALUES (STR_TO_DATE('23/11/22','%d/%m/%y'), 'Vélo', 30, 315 );
  // req.query
  const sql_trainings_cardio =
    "SELECT cardio_date as Date, cardio_exercice as Exercice, cardio_kcal as Kcal, cardio_temps as Temps from `enjoysport`.`training_cardio` ORDER BY Date  ASC";

  connection.query(sql_trainings_cardio, function (error, results, fields) {
    if (error) throw error;
    console.log("sql_trainings_cardio request result: ", results);
    res.send(results);
  });
});

app.get("/muscu", function (req, res) {
  // console.log(req.params.id);
  const sql_trainings_muscu =
    "SELECT tme.*, DATE_FORMAT(tms.muscu_session_date, '%d/%m/%Y') AS muscu_session_date FROM `enjoysport`.`training_muscu_exercise` AS tme,`enjoysport`.`training_muscu_session` AS tms WHERE tme.training_muscu_session_id = tms.muscu_session_id order by tms.muscu_session_date";

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
