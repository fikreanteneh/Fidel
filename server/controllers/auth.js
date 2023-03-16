const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

// Fetching api key from env to connect to Stream Chat
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// Admin sign up process
const signup = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      sureName,
      birthDate,
      role,
      gender,
      profileImage,
      educationLevel,
      department,
      subject,
      classes,
      section,
    } = req.body;

    const fullName = firstName + lastName + sureName;
    const phoneNumber = 0913387536;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret, app_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    // *------------- add the user to the db -------------------------

    const userAccount = await prisma.account.create({
      data: {
        user_id: userId,
        password: hashedPassword,
        details: {
          create: {
            role,
            first_name: firstName,
            last_name: lastName,
            sure_name: sureName,
            gender,
            BirthDate: birthDate,
            profile_picture: profileImage,
          },
        },
      },
    });

    if (role === "Student") {
      const year = new Date().getFullYear();

      const classId = `${classes}-${section}-${year}`;

      const userEnrollment = await prisma.enrollment.create({
        data: {
          user_id: userId,
          year: year.toString(),
          class_id: classId,
        },
      });
    } else {
      const teacherRegistry = await prisma.teacherDetail.create({
        data: {
          user_id: userId,
          level: educationLevel,
          department,
          subject,
        },
      });
    }

    // *--------------------------------------------------------

    res.status(200).json({
      token,
      fullName,
      username,
      userId,
      hashedPassword,
      phoneNumber,
      profileImage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;

  try {
    console.log("beforeeeeeeeee")
    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    console.log("beforeeeeeeeeeeeeeeeeee")
    console.log(username)

    const { users } = await client.queryUsers({ name: username });
    console.log(users)
    if (!users.length)
      return res.status(400).json({ message: "User not found" });
    const success = await bcrypt.compare(
      `${password}`,
      users[0]["hashedPassword"]
    );
  

    const token = serverClient.createUserToken(users[0].id);

  
    // *
    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login };
