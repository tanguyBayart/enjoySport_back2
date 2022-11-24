var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("On y est t'entends");
  res.render("index", { title: "Express" });
});

module.exports = router;
