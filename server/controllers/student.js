const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { mysqlConnection } = require("./admin");

const getStudents = async (req, res) => {
  const { classID } = req.query;
  try {
    const id = String(classID.slice(0, 8));
    const query = ` SELECT * FROM enrollment INNER JOIN account_detail ON enrollment.user_id = account_detail.user_id where enrollment.class_id='${id}';`;
    mysqlConnection.query(query, (err, result) => {
      console.log(result);
      res.status(200).json(result);
    });
  } catch (error) {
    console.log("there is error in getting my students of" + classID);
    res.status(404).json({
      message: "students not found",
    });
  }
};

const getResults = async (req, res) => {
  const { studentID } = req.query;
  // console.log(studentID);
  try {
    const query = `SELECT * FROM result WHERE result.user_id='${studentID}'`;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        res.status(404).json({ message: "result not found" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    res.status(501).json({ error });
  }
};

module.exports = { getStudents, getResults };
