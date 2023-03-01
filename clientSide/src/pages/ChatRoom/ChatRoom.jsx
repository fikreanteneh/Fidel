import React, { useState } from "react";

import { Chat } from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";
import "../../App.css";

// import components
import {
  ChannelContainer,
  ChannelListContainer,
  CreateChannel,
  NavBar,
  NoAccess,
} from "../../components/cexporter";
import { useGlobalState } from "../../StateProvider";

// import ResourceDetail from "./components/ResourceDetail";

const ChatRoom = ({ client }) => {
  const [{ user }] = useGlobalState();
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const globalState = {
    isCreating: isCreating,
    setIsCreating: setIsCreating,
    setCreateType: setCreateType,
    setIsEditing: setIsEditing,
  };


  return (
    <div>
      <NavBar />
      <div className="app__wrapper">
        <Chat client={client} theme="team light">
          <ChannelListContainer globalState={globalState} />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
            // globalState={ globalState}
          />
        </Chat>
      </div>
    </div>
  );
};

export default ChatRoom;
