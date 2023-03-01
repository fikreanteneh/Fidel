import React from "react";
import { Channel, useChatContext } from "stream-chat-react";

// internal components
import {
  ChannelInner,
  CreateChannel,
  EditChannel,
  TeamMessage,
} from "./cexporter";

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  const { channel } = useChatContext(); //*  to get info about current  specific channel

  //* Now we prepare the options of creating or editing the channel

  // * but as both are needed in channelListContainer it means the are global states and they are going to be created inside the app
  // * for channel creating option we return some jsx
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }
  // * for channel Editing option we return some jsx
  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  // * we need Empty state to show something when we create a chat and not messaged yet
  const EmptyState = () => {
    return (
      <div className="channel-empty__container">
        <p className="channel-empty__first">
          This is the start of Your Chat History
        </p>
        <p className="channel-empty__second">
          Send Messages, links, attachments and more . . .
        </p>
      </div>
    );
  };

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        // Message={(messageProps, i) => {
        //   return <TeamMessage key={i} {...messageProps} />;
        // }}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
