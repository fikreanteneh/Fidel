import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";

const GenerateChatrooms = () => {
  const [chatrooms, setChatRooms] = useState({});
  const { client, setActiveChannel } = useChatContext();

  const [created, setCreated] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/admin/chatmembers`)
      .then((res) => res.json())
      .then((data) => {
        setChatRooms(() => data.all);
      })
      .catch((error) => {
        console.log("No classes are yet to be created");
        console.warn(error);
      });
  }, []);
  const createChannel = async (e) => {
    e.preventDefault();

    try {
      for (let channeL of Object.keys(chatrooms)) {
        const newChannel = await client.channel("team", `${channeL}`, {
          name: `${channeL}`,
          members: chatrooms[channeL], //* global array
        });
        console.log(channeL, chatrooms[channeL]);
      }
      setCreated(true);
      //   await newChannel.watch();
      //   setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
      console.log("*--* There is error in creating the channel");
    }
  };
  return (
    <div>
      <button onClick={createChannel}>create</button>
      GenerateChatrooms
      <button onClick={() => console.log(created)}>see</button>
    </div>
  );
};

export default GenerateChatrooms;
