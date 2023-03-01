import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/cexporter";
import "./Home.css";
import axios from "axios";
import art from "./../../assets/art_club-transformed.jpeg";
import tour from "./../../assets/tour_club-transformed.jpeg";
import redCross from "./../../assets/red_cross-transformed.jpeg";

const Home = () => {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      const res = await fetch(`http://localhost:5000/admin/announcement`)
        .then((res) => res.json())
        .then((data) => {
          setAnnouncement(() => data);
        });
    }
    fetchAnnouncement();
    // ! fetch the data from backend to show them below
  }, []);

  function AnnounceList(props) {
    return (
      <div className="announce-container">
        <p className="announce__header">{props.announcements.title}</p>
        <p className="announce-description">
          {props.announcements.description}
        </p>
        <p className="announce-date">{props.announcements.date}</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <section>
        <div className="background">
          <h1 className="portal-heading">Students portal</h1>
        </div>
      </section>

      <h1 className="latest">Latest Announcemt </h1>

      {announcement?.length ? (
        <>
          {announcement.map((announc) => (
            <AnnounceList key={announc.id} announcements={announc} />
          ))}
        </>
      ) : (
        ""
      )}

      <p className="clubs-header">Clubs</p>
      <div className="club__container">
        <div className="club-item">
          <div className="club-image">
            <img src={redCross} alt="Red cross club" />
          </div>
          <p className="club-title"> Red cross club</p>
          <p className="club-description">
            Join our Red Cross School Club and learn valuable life-saving skills
            while making a difference in your community. Make a positive impact
            on your community through volunteering.
          </p>
        </div>
        <div className="club-item">
          <div className="club-image">
            <img src={art} alt="Art club" />
          </div>
          <p className="club-title">Art club</p>
          <p className="club-description">
            Unleash your creativity with our Art School Club. Join us for
            workshops, exhibitions, and events to connect with talented artists
            and showcase your work.
          </p>
        </div>
        <div className="club-item">
          <div className="club-image">
            <img src={tour} alt="Tour club" />
          </div>
          <p className="club-title">Tour club</p>
          <p className="club-description">
            Discover your passion for art with our School Tour. Explore our
            state-of-the-art facilities and learn about our curriculum from
            experienced faculty members.
          </p>
        </div>
      </div>

      <div className="footer">footer here</div>
    </div>
  );
};

export default Home;
