import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./cexporter";
import { CloseCreateChannel } from "../assets";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers, //* global array
      });

      await newChannel.watch();

      setChannelName(""); //* reset input field
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
      console.log("*--* There is error in creating the channel");
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && (
        <div className="flex">
          <ChannelNameInput
            channelName={channelName}
            setChannelName={setChannelName}
          />
          <button
            className="create-channel__button-wrapper"
            onClick={createChannel}
          >
            Create chatroom
          </button>
        </div>
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
    </div>
  );
};

export default CreateChannel;
