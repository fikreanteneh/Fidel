const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const mysql = require("mysql");

// ! i used normal mysql connection here in order to simplify the join
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "portal",
  password: "portalpass",
  database: "leetcode",
});
mysqlConnection.connect((err) => {
  if (err) {
    console.log("---------\nthere is mysql connection error\n-----------");
  } else {
    console.log("********\nmysql Connected Successfuly\n**********");
  }
});

const getClass = async (req, res) => {
  // fetch the classes from classes table and return them

  try {
    const existingClasses = await prisma.classes.findMany({});
    if (existingClasses.length) {
      res.status(200).json(existingClasses);
    } else {
      // res.status(404).json({ message: "there are no classes" });
    }
  } catch (error) {
    res.status(404).json({ message: "there are no classes" });

    // console.log(error);
    // res.status(500).json({ message: "internal server error " });
  }
};

const createClass = async (req, res) => {
  try {
    let counter = 0;
    const year = new Date().getFullYear();
    const sections = ["A", "B"];
    const classes = [9, 10, 11, 12];
    for (CLASS of classes) {
      for (section of sections) {
        const classCreating = await prisma.classes.create({
          data: {
            class_id: `${CLASS}-${section}-${year}`,
            grade_level: CLASS,
            section: `${section}`,
            academic_year: `${year}`,
          },
        });
        counter += 1;
      }
    }
    if (counter == 8) {
      res.status(201).json({
        message: "All classes Are created successfully",
        number: counter,
      });
    } else {
      res.status(422).json({ message: `only ${counter} classes were created` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error " });
  }
};
const getTeachers = async (req, res) => {
  try {
    const selectIphone = `SELECT *
FROM teacherdetail
INNER JOIN account_detail
ON teacherdetail.user_id = account_detail.user_id;
`;

    mysqlConnection.query(selectIphone, (err, result) => {
      if (err) {
        console.log("there is an error in joining teacher and aacount deatail");
      } else {
        console.log("Job Done");

        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "teachers not found" });
  }
};

// !-------------------------------------------

/*


*/

const assignPlacement = async (req, res) => {
  const assignData = req.body;

  const ClassLevel = assignData.selectedData.classLevel;
  const teachers = assignData.selectedData.teachers;
  const year = new Date().getFullYear();
  const class_ids = [`${ClassLevel}-A-${year}`, `${ClassLevel}-B-${year}`];
  let counter = 0;
  try {
    for (classID of class_ids) {
      for (teacher of teachers) {
        const assigningTeachers = await prisma.subject.create({
          data: {
            class_id: `${classID}`,
            subject_id: `${classID}-${teacher.subject}`,
            subject: teacher.subject,
            teacher_name: teacher.teacherName,
            Teacher_id: teacher.teacherUserId,
          },
        });
        counter += 1;
      }
    }
    if (counter === 20) {
      res.status(201).json({ success: "Successfully assigned all teachers" });
    } else {
      res.status(203).json({
        message:
          "Some of the assignments are failed only " +
          counter +
          " are successful",
        count: counter,
      });
    }
  } catch (error) {
    res.status(422).json({
      message: error,
      customMessage: "failed to assign teachers",
      count: counter,
    });
  }
};

// get chat room members
const getChatMembers = async (req, res) => {
  try {
    const chatMembersTeachers = `SELECT class_id,user_id
      FROM subject
      INNER JOIN account_detail
      ON subject.Teacher_id = account_detail.user_id;`;
    const teachers = await queryDB(chatMembersTeachers);

    const chatMembersStudent = `SELECT enrollment.class_id, account_detail.user_id
      FROM enrollment
      INNER JOIN account_detail
      ON enrollment.user_id = account_detail.user_id;
    `;
    const students = await queryDB(chatMembersStudent);

    const chatMembers = [...students, ...teachers];
    const all = {};
    for (let item of chatMembers) {
      let class_id = item["class_id"];
      let year = class_id.split("-")[2];
      let grade = class_id.split("-")[0];
      let year_and_grade = year + "-" + grade;
      if (!(year_and_grade in all)) {
        all[year_and_grade] = [];
      }
      all[year_and_grade].push(item["user_id"]);
    }

    res.status(200).json({ all });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to query the database
const queryDB = (query) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const createAnnouncement = async (req, res) => {
  const date = String(new Date()).slice(0, 25);
  const { title, description } = req.body;
  let status = "NO";

  const query = `insert into Announcement(title,description,date) values('${title}','${description}','${date}')`;
  mysqlConnection.query(query, (err, result) => {
    if (err) {
      res.status(220).json(err);
    } else {
      if (result) {
        status = "OK";
        res.send(status);
      } else {
        res.send(status);
      }
    }
  });

  // Create a new announcement  for the specified
};

const getAnnouncement = async (req, res) => {
  const query = "SELECT * FROM Announcement";
  mysqlConnection.query(query, (err, result) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  getClass,
  createClass,
  getTeachers,
  assignPlacement,
  getChatMembers,
  mysqlConnection,
  createAnnouncement,
  getAnnouncement,
};
