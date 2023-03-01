const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const entryRoute = require("./routes/entryRoute");
const adminRoutes = require("./routes/admin");
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");

const app = express();

const PORT = process.env.PORT || 5000;

// require("dotenv").config(); // enable us to call env in our node server

// middle ware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>portal server</h1>");
});

//! routes
app.use("/auth", authRoutes);
app.use("/entry", entryRoute);
app.use("/admin", adminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

app.listen(PORT, () => {
  console.log("server started");
});
