const express = require("express");

const { entry } = require("../controllers/entry.js");

const router = express.Router();

router.get("/detail", entry);


module.exports = router;
