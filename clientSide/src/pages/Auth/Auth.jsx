// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { useState } from "react";
import "./Auth.css";
import LoginForm from "./LoginForm";
import Cookies from "universal-cookie";
import axios from "axios";
import { useGlobalState } from "../../StateProvider";
import { useNavigate } from "react-router-dom";
import { NoAccess } from "./../../components/cexporter";

const cookies = new Cookies();

function Auth() {
  const [{ user }] = useGlobalState();

  const [registering, setRegistration] = useState(false);
  const [regError, setRegError] = useState(null);

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [authData, setAuthData] = useState({
    IdNo: "",
    password: "",
    profileImage: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    sureName: "",
    day: "",
    month: "",
    year: "",
    role: "Student",
    gender: "Male",

    // add more form fields as needed
  });
  const [StudentDetail, setStudentDetail] = useState({
    classes: "",
    section: "",
  });
  const [TeacherDetail, setTeacherDetail] = useState({
    educationLevel: "",
    department: "",
    subject: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    if (step === 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (step === 2) {
      if (formData["role"] === "Student") {
        setStudentDetail((prevStudentData) => ({
          ...prevStudentData,
          [name]: value,
        }));
      } else {
        setTeacherDetail((prevTeacherData) => ({
          ...prevTeacherData,
          [name]: value,
        }));
      }
    } else {
      setAuthData((prevAuthData) => ({
        ...prevAuthData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStep((prevStep) => prevStep + 1);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    setRegistration(() => true);
    const URL = "http:localhost:5000/auth"; //this is the end point we send request to

    //     //* data:{} is to destructure the responses from the backend

    const signUpRes = await axios.post(`http://localhost:5000/auth/signup`, {
      username: authData["IdNo"],
      password: authData["password"],
      firstName: formData["firstName"],
      lastName: formData["lastName"],
      sureName: formData["sureName"],
      birthDate:
        formData["day"] + "/" + formData["month"] + "/" + formData["year"],
      role: formData["role"],
      gender: formData["gender"],
      profileImage: authData["profileImage"],
      educationLevel: TeacherDetail["educationLevel"],
      department: TeacherDetail["department"],
      subject: TeacherDetail["subject"],
      classes: StudentDetail["classes"],
      section: StudentDetail["section"],
    });
    const {
      token,
      fullName,
      username,
      userId,
      hashedPassword,
      phoneNumber,
      profileImage,
    } = signUpRes["data"];

    if (signUpRes["data"]) {
      setRegistration(() => false);
      setRegError(() => "Registration success!!");
    } else {
      setRegError(() => "Registration Failed!!");
    }
    // console.log(signUpRes);
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    cookies.set("phoneNumber", phoneNumber);
    cookies.set("avatarURL", profileImage);
    cookies.set("hashedPassword", hashedPassword);

    // send to server
    window.location.reload();
  };
  const handlePrevious = (event) => {
    event.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  //!*this is A login Up form Conditional Renderer   //
  if (user?.role !== "Admin") {
    return <NoAccess />;
  }
  const renderSignUpForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="Authentication-wrapper">
            <form onSubmit={handleSubmit} className="register-wrapper">
              <div className="welcome">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <input
                onChange={handleChange}
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData["firstName"]}
              />

              <input
                onChange={handleChange}
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData["lastName"]}
              />
              <input
                onChange={handleChange}
                required
                type="text"
                name="sureName"
                placeholder="Sure Name"
                value={formData["sureName"]}
              />
              <div className="roleGender">
                <select
                  name="role"
                  value={formData["role"]}
                  onChange={handleChange}
                  required
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>

                <select
                  name="gender"
                  value={formData["gender"]}
                  onChange={handleChange}
                  required
                >
                  <option name="gender" value="Male">
                    Male
                  </option>
                  <option name="gender" value="Female">
                    Female
                  </option>
                </select>
              </div>
              <div
                style={{
                  position: "relative",
                }}
              >
                <label
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "1px",
                    color: "#0fa37f",
                  }}
                >
                  Birth Date
                </label>
              </div>
              <div className="birthday-wrapper">
                <input
                  onChange={handleChange}
                  name="day"
                  type="number"
                  min={"1"}
                  max="30"
                  placeholder="Day"
                  value={formData["day"]}
                />
                <input
                  onChange={handleChange}
                  name="month"
                  type="number"
                  min={"1"}
                  max="12"
                  placeholder="Month"
                  value={formData["month"]}
                  required
                />
                <input
                  onChange={handleChange}
                  name="year"
                  type="number"
                  min={"1990"}
                  max="2015"
                  placeholder="Year"
                  value={formData["year"]}
                  required
                />
              </div>
              <button>Continue</button>
              <i
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  color: "white",
                  backgroundColor: "#0fa37f",
                  display: "grid",
                  placeItems: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  margin: "2rem auto",
                }}
                class="fa-sharp fa-solid fa-arrow-left"
              ></i>
            </form>
          </div>
        );
      case 2:
        if (formData["role"] === "Student") {
          return (
            <div className="Authentication-wrapper">
              <form className="register-wrapper" onSubmit={handleSubmit}>
                <div className="welcome">
                  <i className="fa-solid fa-pen-nib"></i>
                </div>

                <input
                  onChange={handleChange}
                  type="number"
                  name="classes"
                  placeholder="Class"
                  min={"1"}
                  max="12"
                  value={StudentDetail["classes"]}
                  required
                />
                <input
                  value={StudentDetail["section"]}
                  onChange={handleChange}
                  type="text"
                  name="section"
                  placeholder="Section"
                  required
                />
                <button>Continue</button>
                <button onClick={handlePrevious}>Previous</button>
              </form>
            </div>
          );
        }
        return (
          <div className="Authentication-wrapper">
            <form onSubmit={handleSubmit} className="register-wrapper">
              <div className="welcome">
                <i className="fa-solid fa-pen-nib"></i>
              </div>

              <div className="teachers-options">
                <select
                  name="subject"
                  value={TeacherDetail["subject"]}
                  onChange={handleChange}
                  required
                >
                  <option value="English">English</option>
                  <option value="Amharic">Amharic</option>
                  <option value="Afaan Oromo">Afaan Oromo</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Geography">Geography</option>
                  <option value="History">History</option>
                  <option value="Civics">Civics</option>
                </select>
                <select
                  name="department"
                  value={TeacherDetail["department"]}
                  onChange={handleChange}
                  required
                >
                  <option value="Language">Language</option>
                  <option value="Natural">Natural</option>
                  <option value="Social">Social</option>
                </select>
                <select
                  name="educationLevel"
                  value={TeacherDetail["educationLevel"]}
                  onChange={handleChange}
                  required
                >
                  <option value="Degree">Degree</option>
                  <option value="Masters">Masters</option>
                  <option value="Phd">Phd</option>
                </select>
              </div>

              <button>Continue</button>
              <button onClick={handlePrevious}>Previous</button>
            </form>
          </div>
        );

      // add more cases for additional steps
      case 3:
        return (
          <div className="Authentication-wrapper">
            <form onSubmit={handleSubmit} className="register-wrapper">
              <div className="welcome">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <input
                onChange={handleChange}
                required
                type="text"
                name="IdNo"
                placeholder="ID No"
                value={authData["IdNo"]}
              />
              <input
                onChange={handleChange}
                required
                type="text"
                name="password"
                placeholder="Password"
                value={authData["password"]}
              />
              <input
                onChange={handleChange}
                required
                type="text"
                name="profileImage"
                placeholder="Profile Image"
                value={authData["profileImage"]}
              />
              <button>Continue</button>
              <button onClick={handlePrevious}>Previous</button>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="Authentication-wrapper">
            <form onSubmit={registerUser} className="register-wrapper">
              <div className="welcome">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <h1> {registering ? "Registering  . . . " : regError}</h1>
              <button>Confirm</button>
              <button onClick={handlePrevious}>Previous</button>
              <i
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  color: "white",
                  backgroundColor: "#0fa37f",
                  display: "grid",
                  placeItems: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  margin: "2rem auto",
                }}
                class="fa-sharp fa-solid fa-arrow-left"
              ></i>
            </form>
          </div>
        );

      case 5:
        return "success";
      default:
        return null;
    }
  };

  return <div>{renderSignUpForm()}</div>;
}

export default Auth;
