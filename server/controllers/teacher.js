const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { mysqlConnection } = require("./admin");

const getMyClasses = async (req, res) => {
  const { teacherId } = req.query;
  try {
    const myClasses = await prisma.subject.findMany({
      where: {
        Teacher_id: teacherId,
      },
    });
    res.status(200).json(myClasses);
  } catch (error) {
    console.log("there is error in getting my classes");
    res.status(404).json({
      message: "not found",
    });
  }
};

const postResult = async (req, res) => {
  const { studentID, subject_id, result, term } = req.body;

  try {
    const query = `INSERT INTO result (subject_id, user_id, result)
VALUES ('${subject_id}', '${studentID}', JSON_OBJECT('${term}', '${result}'))
ON DUPLICATE KEY UPDATE
  result = JSON_MERGE(result, JSON_OBJECT('${term}', '${result}'));
;
`;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        res.send("ther is error");
      } else {
        res.status(201).json({ result, userMarked: studentID });
      }
    });
  } catch (error) {
    res.status(501).json({
      message: "failed to submit result",
    });
  }
};

module.exports = { getMyClasses, postResult };
