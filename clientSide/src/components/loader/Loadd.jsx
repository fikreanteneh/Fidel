import React, { useEffect } from "react";

import Cookies from "universal-cookie";
import rotate from "../../assets/loadGif.gif";
import { useGlobalState } from "../../StateProvider";
import "./Loader.css";
const cookies = new Cookies();
const id = cookies.get("userId");
const Loadd = ({ setLoading, loading }) => {
  const [{ user }, dispatch] = useGlobalState();

  useEffect(() => {
    fetch(`http://localhost:5000/entry/detail?UserID=${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_USER",
          user: data["basics"],
        });
      });
    setTimeout(() => {
      setLoading(() => false);
    }, 1000);
  }, []);

  return (
    <div className="loading-wrapper">
      <div className="load-screen">
        {/* <Loader /> */}
        <img src="" />
        <p>Gathering your Data</p>
      </div>
    </div>
  );
};

export default Loadd;
