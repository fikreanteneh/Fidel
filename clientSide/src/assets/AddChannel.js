import React from "react";

export const AddChannel = ({ globalState, type, setToggleContainer }) => (
  <>
    <span
      onClick={() => {
        globalState.setCreateType(type);
        globalState.setIsCreating((prevState) => !prevState);
        globalState.setIsEditing(false);
        if (setToggleContainer) setToggleContainer((prevState) => !prevState);
      }}
    >
      <i className="fa-solid fa-plus" style={{color:"red"}}></i>
    </span>
  </>
);
