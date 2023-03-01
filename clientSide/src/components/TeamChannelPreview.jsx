import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
  globalState,
  setToggleContainer,
  channel,
  type,
}) => {
  const { channel: activeChannel, client, setActiveChannel } = useChatContext(); //* renamed channel to active cause already we have the channels above

  //* this is for group messages

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      <i className="fa-solid fa-user"></i>

      {channel?.data?.name || channel?.data?.id}
    </p>
  );

  //* this is for direct messages
  //* the api response for members is not an array it i like below
  // {

  //   "id1":' { user }';

  //   "id2": '{ user}'
  // }

  // ! so we have to change it
  /*
using a built in js Objects.value 
will return each members object
 as elements of an array changing the keys(id) to indexes
 NOW  destructure the user object inside it
 the filters callback return the users with id different form the searching person 

*/
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper__selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        globalState.setIsCreating(false);
        globalState.setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
