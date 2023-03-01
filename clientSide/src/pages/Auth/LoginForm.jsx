import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useGlobalState } from "../../StateProvider";

// ! this is to upload new data to database
const cookies = new Cookies();
const LoginForm = () => {

  const [LoginData, setLoginData] = useState({
    IdNo: "",
    password: "",
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const logRes = await axios.post(`http://localhost:5000/auth/login`, {
      username: LoginData["IdNo"],
      password: LoginData["password"],
    });

    const { token, fullName, username, userId } = logRes["data"];

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    window.location.reload();
  };

  return (
    <div className="Authentication-wrapper">
      <form onSubmit={handleSubmit} className="register-wrapper">
        <div className="welcome">
          <i className="fa-solid fa-pen-nib"></i>
        </div>
        {/* <h2 style={{ textAlign: "center", color: "#0fa37f" }}>Welcome</h2> */}
        <input
          onChange={handleChange}
          required
          type="text"
          name="IdNo"
          placeholder="ID No"
          value={LoginData["IdNo"]}
        />

        <input
          onChange={handleChange}
          required
          type="text"
          name="password"
          placeholder="Password"
          value={LoginData["password"]}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
