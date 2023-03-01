import React from "react";
import { useNavigate } from "react-router-dom";

import "./No.css";

const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="NoA-wrapper">
      <div>
        <div className="close-icon" onClick={() => { navigate("/")}}>
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
        <p className="NoAccess-text">You don't have access to this Page</p>
        
      </div>
    </div>
  );
};

export default NoAccess;
