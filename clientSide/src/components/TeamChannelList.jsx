import React from "react";

import { AddChannel } from "../assets";
import { useGlobalState } from "../StateProvider";

const TeamChannelList = ({
  setToggleContainer,
  children,
  error = false,
  loading,
  type,
  globalState,
}) => {
  const [{ user }] = useGlobalState();

  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === "team" ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        {user?.role === "Admin" && (
          <AddChannel
            globalState={globalState}
            type={type === "team" ? "team" : "messaging"}
            setToggleContainer={setToggleContainer}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
