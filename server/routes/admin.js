const express = require("express");
const router = express.Router();

const {
  getClass,
  createClass,
  getTeachers,
  assignPlacement,
  getChatMembers,
  getAnnouncement,
  createAnnouncement,
} = require("../controllers/admin");

// ! classes related
router.get("/classes", getClass);
router.post("/classes", createClass);
// ! teacher related
router.get("/teachers", getTeachers);
router.post("/placement", assignPlacement);

// get all teachers and student of all class
router.get("/chatmembers", getChatMembers);

router.get("/announcement", getAnnouncement);
router.post("/announcement", createAnnouncement);

module.exports = router;
