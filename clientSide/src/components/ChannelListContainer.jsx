import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

// custom components
import {
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "./cexporter";

const cookies = new Cookies();
const SideBar = ({ logOut }) => {
  return (
    <div
      className="channel-list__sidebar"
      style={{
        border: "1px solid red",
      }}
    >
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={""} alt="Hs" width={"30"} />
        </div>
      </div>

      <div className="channel-list__sidebar__icon2">
        <div className="icon2__inner" onClick={logOut}>
          <img src={"logout"} alt="logout" width={"30"} />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">Classroom</p>
    </div>
  );
};
// * filters for the team channels and direct messages
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({ globalState, setToggleContainer }) => {
  const { client } = useChatContext();

  const logOut = () => {
    // * the logic here is to clear the cookies anf refresh
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  // * this filter means we get all channels and direct messages the user is in
  const filters = { members: { $in: [client.userID] } };
  return (
    <>
      {/* <SideBar logOut={logOut} /> */}
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        {/* <ChannelSearch /> */}
        {/* for group messages */}
        <ChannelList
          filters={filters} //* object allow us to filter
          channelRenderFilterFn={customChannelTeamFilter} //* function to be called on filters
          List={(listProps) => {
            return (
              <TeamChannelList
                {...listProps}
                type="team"
                globalState={globalState}
                setToggleContainer={setToggleContainer}
              />
            );
          }}
          Preview={(previewProps) => {
            return (
              <TeamChannelPreview
                {...previewProps}
                setToggleContainer={setToggleContainer}
                globalState={globalState}
                type="team"
              />
            );
          }}
        />
        {/* for direct messages */}
        {/* <ChannelList
          filters={filters} //* object allow us to filter
          channelRenderFilterFn={customChannelMessagingFilter} //* function to be called on filters
          List={(listProps) => {
            return (
              <TeamChannelList
                {...listProps}
                type="messaging"
                globalState={globalState}
                setToggleContainer={setToggleContainer}
              />
            );
          }}
          Preview={(previewProps) => {
            return (
              <TeamChannelPreview
                {...previewProps}
                globalState={globalState}
                setToggleContainer={setToggleContainer}
                type="messaging"
              />
            );
          }}
        /> */}
      </div>
    </>
  );
};

const ChannelListContainer = ({ globalState }) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent globalState={globalState} />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          globalState={globalState}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};
export default ChannelListContainer;
