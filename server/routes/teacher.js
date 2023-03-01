const express = require("express");

const { getMyClasses,postResult } = require("../controllers/teacher");

const router = express.Router();

router.get("/myclasses", getMyClasses);
router.post("/resultsubmission", postResult);



module.exports = router;
