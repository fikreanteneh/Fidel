import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";

import { StreamChat } from "stream-chat";

// ! pages imported here
import {
  ChatRoom,
  Home,
  ProfilePage,
  Auth,
  Announcement,
  Myclass,
  Placement,
  Resource,
  Grade,
  LoginForm,
} from "./pages/pageExporter";
import Loadd from "./components/loader/Loadd";
import axios from "axios";

const cookies = new Cookies();
//these are the api key
// const apiKey = "2veujawxupdk";
const apiKey = "5upvs2hqnq3j";
const client = StreamChat.getInstance(apiKey); //* create an instance
const authToken = cookies.get("token"); //* available for logged in only
// * the above will git the option for the authentication to be get in from cookies

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}
const userID = cookies.get("userId");

const App = () => {
  const [USER_ID, setUSER_ID] = useState(null);
  const [loading, setLoading] = useState(cookies.get("userId") ? true : false);
  useEffect(() => setUSER_ID(userID));

  if (!authToken) return <LoginForm />;

  // const userExist =
  if (loading) return <Loadd setLoading={setLoading} loading={loading} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chatroom" element={<ChatRoom client={client} />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/myclass" element={<Myclass />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/grades" element={<Grade />} />
        <Route path="/register" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
