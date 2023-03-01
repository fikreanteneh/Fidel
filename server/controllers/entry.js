const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const entry = async (req, res) => {
  const { UserID } = req.query;
  try {
    const userDetail = await prisma.account_detail.findMany({
      where: {
        user_id: String(UserID),
      },
    });
    // console.log(userDetail);
    if (userDetail.length) {
      res.status(200).json({
        basics: userDetail[0],
      });
    } else {
      res.status(500).json({
        message: "there is no user with this id",
      });
    }
  } catch (error) {
    console.log("error");

    res.status(500).json({ message: error });
  }
};

module.exports = { entry };
