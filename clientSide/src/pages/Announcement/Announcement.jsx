import React from "react";
import { NavBar, NoAccess } from "../../components/cexporter";
import "./Announcement.css";
import { useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../StateProvider";

const Announcement = () => {
  const [{ user }] = useGlobalState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(title, description);
  const [sent, setSent] = useState(false);

  const announce = async (event) => {
    event.preventDefault();
    setTitle("");
    setDescription("");

    const announceResponse = await axios.post(
      `http://localhost:5000/admin/announcement`,
      {
        title,
        description,
      }
    );
    if (announceResponse.data === "OK") {
      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 8000);
    }
  };

  if (user?.role !== "Admin") return <NoAccess />;

  return (
    <div>
      <NavBar />
      <div className="announcement">
        <h1 className="announcement-header">Todays Announcement</h1>
        <form onSubmit={announce} method="post" className="announcement-form">
          <div className="announce-title">
            <label className="title__label" htmlFor="title">
              Title
            </label>
            <input
              className="title__textArea"
              name="title"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></input>
          </div>
          <div className="announce-description">
            <label className="description__label" htmlFor="description">
              Announcement
            </label>
            <textarea
              className="description__textArea"
              value={description}
              name="description"
              id="description"
              onChange={(evnet) => setDescription(evnet.target.value)}
            ></textarea>
          </div>
          <div className="btn-container">
            <button type="submit" className="announce-btn">
              Announce
            </button>
          </div>
        </form>
      </div>

      {sent ? (
        <h1 style={{ textAlign: "center" }}>
          ✔️ Annoucment created successfully{" "}
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};

export default Announcement;
