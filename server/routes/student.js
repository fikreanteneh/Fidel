const express = require("express");

const { getStudents, getResults } = require("../controllers/student");

const router = express.Router();

router.get("/class", getStudents);
router.get("/result", getResults);

module.exports = router;
