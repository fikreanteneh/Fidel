// import React, { useState } from "react";
// import Cookies from "universal-cookie";
// import signinImage from "../assets/signup.jpg";
// import axios from "axios";

// const initialState = {
//   fullName: "",
//   username: "",
//   password: "",
//   confirmPassword: "",
//   phoneNumber: "",
//   avatarURL: "",
// };
// const cookies = new Cookies();

// const Auth = () => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [form, setForm] = useState(initialState);
//   const handleChange = (e) => {
//     setForm(() => {
//       return { ...form, [e.target.name]: e.target.value };
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { fullName, username, password, phoneNumber, avatarURL } = form;

//     const URL = "http://10.6.192.37:5000/auth"; //this is the end point we send request to

//     //* data:{} is to destructure the responses from the backend
//     const {
//       data: { token, userId, hashedPassword },
//     } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
//       username,
//       password,
//       fullName,
//       phoneNumber,
//       avatarURL,
//     });

//     cookies.set("token", token);
//     cookies.set("username", username);
//     cookies.set("fullName", fullName);
//     cookies.set("userId", userId);
//     // * if we are registering we need more data to be saved in the cookies

//     //! why do we need to send all unnecessary data back and forth 
//     //! that is is because if we start saving the cookies and other data before sending them to backend and later in the DB or Backend promises failed it will be useless
//     if (isSignup) {
//       cookies.set("phoneNumber", phoneNumber);
//       cookies.set("avatarURL", avatarURL);
//       cookies.set("hashedPassword", hashedPassword);
//     }
//     // * once we need to reload the page to save the changes to the cookies of the Browser and
//     //! in our App we check for the auth to validate the user and render home page for when we hit this login/sign up form we are stopped at that line in app.jsx so once we refresh we pass that pint because we will have authToken true that was initially set to FALSE and render home page
//     window.location.reload();
//   };
//   const switchMode = () => {
//     setIsSignup((prevState) => !prevState);
//   };
//   return (
//     <div className="auth__form-container">
//       <div className="auth__form-container_fields">
//         <div className="auth__form-container_fields-content">
//           <p>{isSignup ? "Sign Up" : "Sign In"}</p>
//           <form onSubmit={handleSubmit}>
//             {isSignup && (
//               <div className="auth__form-container_fields-content_input">
//                 <label htmlFor="fullName">Full Name</label>
//                 <input
//                   name="fullName"
//                   type="text"
//                   placeholder="Full Name"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}
//             <div className="auth__form-container_fields-content_input">
//               <label htmlFor="username">Username</label>
//               <input
//                 name="username"
//                 type="text"
//                 placeholder="Username"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             {isSignup && (
//               <div className="auth__form-container_fields-content_input">
//                 <label htmlFor="phoneNumber">Phone Number</label>
//                 <input
//                   name="phoneNumber"
//                   type="text"
//                   placeholder="Phone Number"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}
//             {isSignup && (
//               <div className="auth__form-container_fields-content_input">
//                 <label htmlFor="avatarURL">Avatar URL</label>
//                 <input
//                   name="avatarURL"
//                   type="text"
//                   placeholder="Avatar URL"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}
//             <div className="auth__form-container_fields-content_input">
//               <label htmlFor="password">Password</label>
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             {isSignup && (
//               <div className="auth__form-container_fields-content_input">
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                   name="confirmPassword"
//                   type="password"
//                   placeholder="Confirm Password"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}
//             <div className="auth__form-container_fields-content_button">
//               <button>{isSignup ? "Sign Up" : "Sign In"}</button>
//             </div>
//           </form>
//           <div className="auth__form-container_fields-account">
//             <p>
//               {isSignup ? "Already have an account?" : "Don't have an account?"}
//               <span onClick={switchMode}>
//                 {isSignup ? "Sign In" : "Sign Up"}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="auth__form-container_image">
//         <img src={signinImage} alt="sign in" />
//       </div>
//     </div>
//   );
// };

// export default Auth;
